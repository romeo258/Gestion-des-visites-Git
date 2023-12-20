import { Component } from '@angular/core';
import { VisitService } from 'src/app/service/visit.service';
import { VisitorService } from 'src/app/service/visitor.service';
import { Visit } from 'src/app/interfaces/Visit';
import { Visitor } from 'src/app/interfaces/visitor';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  public visits!: Visit[];
  public visitors!: Visitor[];

  private subscription: Subscription = new Subscription();

  // Période sélectionnée pour les statistiques
  selectedPeriod: string = 'week';

  // Visites filtrées en fonction de la période sélectionnée
  filteredVisits: Visit[] = [];

  // Nombre de visites
  visitCount: number = 0;
  visitorCount: number = 0;

  // Pagination properties
  pageSize: number = 4; // Nombre de visites par page
  currentPage: number = 1; // Page actuelle

  constructor(
    private visitService: VisitService,
    private visitorService: VisitorService
  ) {}

  ngOnDestroy(): void {
    // Nettoyage des abonnements
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    // Initialisation des données
    this.getVisits();
    this.getVisitors();
    this.updateStatistics();
  }

  // Récupération des visites depuis le service
  getVisits(): void {
    this.subscription.add(
      this.visitService.getVisits().subscribe({
        next: (response: Visit[]) => {
          this.visits = response;
          this.updateStatistics(); // Mise à jour des statistiques après le chargement des visites
        },
        error: (error: HttpErrorResponse) => {
          alert(error.message);
        }
      })
    );
  }

  // Récupération des visiteurs depuis le service
  getVisitors(): void {
    this.subscription.add(
      this.visitorService.getVisitors().subscribe({
        next: (response: Visitor[]) => {
          this.visitors = response;
          
          // Récupération du nombre de visiteurs
        this.visitorCount = this.visitors.length;
        },
        error: (error: HttpErrorResponse) => {
          alert(error.message);
        }
      })
    );
  }

  // Mise à jour des statistiques en fonction de la période sélectionnée
  updateStatistics() {
    if (this.selectedPeriod === 'all') {
      // Si 'all' est sélectionné, affichez toutes les visites non filtrées
      this.filteredVisits = this.visits;
      this.visitCount = this.visits.length; // Nombre total de visites
    } else {
      // Sinon, filtrez les visites en fonction de la période sélectionnée
      const statistics = this.visitService.getVisitsStatistics(this.visits, this.selectedPeriod);
      this.filteredVisits = statistics.visits;
      this.visitCount = statistics.count; // Utilisez le nombre de visites de la période sélectionnée
    }
  }

  // Obtenez les visites visibles en fonction de la pagination
  getVisibleVisits(): Visit[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.filteredVisits.slice(startIndex, endIndex);
  }

  // Obtenez les pages disponibles
  getPages(): number[] {
    const pageCount = Math.ceil(this.filteredVisits.length / this.pageSize);
    return Array.from({ length: pageCount }, (_, index) => index + 1);
  }

  // Gérez le changement de page
  onPageChange(page: number): void {
    this.currentPage = page;
  }
}

import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PartialObserver, Subscription } from 'rxjs';
import { Visit } from 'src/app/interfaces/Visit';
import { Visitor } from 'src/app/interfaces/visitor';
import { VisitService } from 'src/app/service/visit.service';
import { VisitorService } from 'src/app/service/visitor.service';

@Component({
  selector: 'app-visit',
  templateUrl: './visit.component.html',
  styleUrls: ['./visit.component.css']
})

export class VisitComponent {
  isModalOpen = false;
  blurPage = false;

  public visits!: Visit[];
  public visitors!: Visitor[];
  

  // variable pour ajout et suppression de visite
  public editVisit: Visit | null = null;
  public deleteVisit: Visit | null = null;


  //iitialisation du subscribe de rxjs
  private subscription: Subscription = new Subscription();

  //mon constructeur
  constructor(private visitService: VisitService, private visitorService: VisitorService) { }
  ngOnDestroy(): void {
  }
  ngOnInit(): void {
    this.getVisits();
    this.getVisitors();
  }

  //Service pour liste deroulente de visiteur dans le formulaire d'ajout des visites
  public getVisits(): void {
    this.subscription.add(
      this.visitService.getVisits().subscribe({
        next: (response: Visit[]) => {
          console.log('Visits:', response);
          this.visits = response;
        },
        error: (error: HttpErrorResponse) => {
          alert(error.message);
        }
      })
    );
  }

  //function to open modal
  public onOpenModal(visit: Visit | null, mode: string): void{
    this.isModalOpen = true; //activatat modal open
    this.blurPage = true; //activate modal blur
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add'){
      button.setAttribute('data-target', '#addVisitModal');
    }
    if (mode === 'edit'){
      this.editVisit = visit ?? null;
      button.setAttribute('data-target', '#updateVisitModal');
    }
    if (mode === 'delete'){
      this.deleteVisit = visit;
      button.setAttribute('data-target', '#deleteVisitModal');
    }
    container?.appendChild(button);
    button.click();
  }

  // *************Function to add visit******************
  public onAddVisit(addForm: NgForm): void {
    const addVisitForm = document.getElementById('add-visit-form');
  
    if (addVisitForm) {
      addVisitForm.click();
    } else {
      console.error("Element with ID 'add-visit-form' not found");
    }
  
    this.visitService.addVisit(addForm.value).subscribe({
      next: (response: Visit) => {
        console.log(response);
        this.getVisits();
        addForm.reset();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    } as PartialObserver<Visit>); // Ajoutez cette ligne pour indiquer explicitement le type générique à PartialObserver
  }

  // *************Function to update visit******************
  public onUpdateVisit(visit: Visit): void {
    this.visitService.updateVisit(visit).subscribe({
      next: (response: Visit) => {
        console.log(response);
        this.getVisits();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    } as PartialObserver<Visit>);
  }

  // **************desactivate blur after closing modal*************
  onCloseModal() {
    this.isModalOpen = false;
    this.blurPage = false;
  }

  // liste deroulente des visiteurs pour l'ajout ou la modification d'une visite
  public getVisitors(): void {
    this.subscription.add(
      this.visitorService.getVisitors().subscribe({
        next: (response: Visitor[]) => {
          console.log('Visitors:', response);
          this.visitors = response;
        },
        error: (error: HttpErrorResponse) => {
          alert(error.message);
        }
      })
    );
  }

  // *******************Filtre / rechercher Visiteur ************
  public searchVisits(key: string): void {
    console.log(key);
    const results: Visit[] = [];
    for (const visit of this.visits) {
      if (visit.purpose.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
          visit.visitor.lastName.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(visit);
      }
    }
    this.visits = results;
    if (results.length === 0 || !key) {
      this.getVisits();
    }
  }

  // *************Function to delete visit******************
  public onDeleteVisit(visitCode: number | undefined): void {
    console.log('onDeleteVisit called with visitCode:', visitCode);
    if (visitCode !== undefined) {
      this.visitService.deleteVisit(visitCode).subscribe({
        next: () => {
          console.log('Visit deleted successfully');
          this.getVisits();
        },
        error: (error: HttpErrorResponse) => {
          alert(error.message);
        }
      } as PartialObserver<void>);
    } else {
      console.error('Visit ID is undefined');
    }
  }
}

import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PartialObserver, Subscription } from 'rxjs';
import { Visitor } from 'src/app/interfaces/visitor';
import { VisitorService } from 'src/app/service/visitor.service';

@Component({
  selector: 'app-visitor',
  templateUrl: './visitor.component.html',
  styleUrls: ['./visitor.component.css']
})

export class VisitorComponent implements OnInit, OnDestroy {
  isModalOpen = false;
  blurPage = false;
  
  public visitors!: Visitor[];

  // variable pour ajout et suppression visiteur
  public editVisitor: Visitor | null = null;
  public deleteVisitor: Visitor | null = null;

  //iitialisation du subscribe de rxjs
  private subscription: Subscription = new Subscription();

  constructor(private visitorService: VisitorService, ) { }
  ngOnDestroy(): void {
  }

  ngOnInit(): void {
    this.getVisitors();
  }

  //function var pagination
  

//Service pour liste de visiteur
public getVisitors(): void {
  this.subscription.add(
    this.visitorService.getVisitors().subscribe({
      next: (response: Visitor[]) => {
        console.log('Visiteurs:', response);
        this.visitors = response;
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    })
  );
}
// *******************Filtre / rechercher Visiteur ************
public searchVisitors(key: string): void {
  console.log(key);
  const results: Visitor[] = [];
  for (const visitor of this.visitors) {
    if (visitor.lastName.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        visitor.firstName.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
      results.push(visitor);
    }
  }
  this.visitors = results;
  if (results.length === 0 || !key) {
    this.getVisitors();
  }
}

  // *************Function to add visitor******************
  public onAddVisitor(addForm: NgForm): void {
    const addVisitorForm = document.getElementById('add-visitor-form');
  
    if (addVisitorForm) {
      addVisitorForm.click();
    } else {
      console.error("Element with ID 'add-visitor-form' not found");
    }
  
    this.visitorService.addVisitor(addForm.value).subscribe({
      next: (response: Visitor) => {
        console.log(response);
        this.getVisitors();
        addForm.reset();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    } as PartialObserver<Visitor>); // Ajoutez cette ligne pour indiquer explicitement le type générique à PartialObserver
  }

  // *************Function to update visitor******************
  public onUpdateVisitor(visitor: Visitor): void {
    this.visitorService.updateVisitor(visitor).subscribe({
      next: (response: Visitor) => {
        console.log(response);
        this.getVisitors();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    } as PartialObserver<Visitor>);
  }

  // *************Function to delete visitor******************
  public onDeleteVisitor(visitorId: number | undefined): void {
    if (visitorId !== undefined) {
      this.visitorService.deleteVisitor(visitorId).subscribe({
        next: () => {
          console.log('Visitor deleted successfully');
          this.getVisitors();
        },
        error: (error: HttpErrorResponse) => {
          alert(error.message);
        }
      } as PartialObserver<void>);
    } else {
      console.error('Visitor ID is undefined');
    }
  }

  //function to open modal
  public onOpenModal(visitor: Visitor | null, mode: string): void{
    this.isModalOpen = true; //activatat modal open
    this.blurPage = true; //activate modal blur
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add'){
      button.setAttribute('data-target', '#addVisitorModal');
    }
    if (mode === 'edit'){
      this.editVisitor = visitor ?? null;
      button.setAttribute('data-target', '#updateVisitorModal');
    }
    if (mode === 'delete'){
      this.deleteVisitor = visitor;
      button.setAttribute('data-target', '#deleteVisitorModal');
    }
    container?.appendChild(button);
    button.click();
  }

  // **************desactivate blur after closing modal*************
  onCloseModal() {
    this.isModalOpen = false;
    this.blurPage = false;
  }
  
  
}

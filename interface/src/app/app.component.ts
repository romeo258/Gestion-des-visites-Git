import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  
  title: string = 'Dashboard'; // Définissez la valeur initiale de title selon vos besoins

  updateTitle(newTitle: string): void {
    this.title = newTitle;
  }
}

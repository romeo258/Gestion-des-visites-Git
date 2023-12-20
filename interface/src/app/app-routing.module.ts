import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VisitorComponent } from './visitor/visitor/visitor.component';
import { HomeComponent } from './home/home/home.component';
import { VisitComponent } from './visit/visit/visit.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {path : "home", component : HomeComponent},
  {path : "visitor", component : VisitorComponent},
  {path : "visit", component : VisitComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VisitorService } from './service/visitor.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { VisitorComponent } from './visitor/visitor/visitor.component';
import { HomeComponent } from './home/home/home.component';
import { VisitComponent } from './visit/visit/visit.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AppComponent,
    VisitorComponent,
    HomeComponent,
    VisitComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Visitor } from '../interfaces/visitor';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class VisitorService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getVisitors(): Observable<Visitor[]> {
    return this.http.get<Visitor[]>(`${this.apiServerUrl}/visitor/all`); // Utilisez des backticks (``) ici
  }

  public addVisitor(visitor: Visitor): Observable<Visitor> {
    return this.http.post<Visitor>(`${this.apiServerUrl}/visitor/add`, visitor); // Utilisez des backticks (``) ici
  }

  public updateVisitor(visitor: Visitor): Observable<Visitor> {
    return this.http.put<Visitor>(`${this.apiServerUrl}/visitor/update`, visitor); // Utilisez des backticks (``) ici
  }

  public deleteVisitor(visitorId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/visitor/delete/${visitorId}`); // Utilisez des backticks (``) ici
  }


  
}

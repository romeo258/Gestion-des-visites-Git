import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Visit } from '../interfaces/Visit';
import { isSameWeek, isSameMonth, startOfWeek, startOfMonth, endOfWeek, endOfMonth, startOfDay, endOfDay } from 'date-fns';


@Injectable({ providedIn: 'root' })
export class VisitService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getVisits(): Observable<Visit[]> {
    return this.http.get<Visit[]>(`${this.apiServerUrl}/visit/all`); 
  }

  public addVisit(visit: Visit): Observable<Visit> {
    return this.http.post<Visit>(`${this.apiServerUrl}/visit/add`, visit); 
  }

  public updateVisit(visit: Visit): Observable<Visit> {
    return this.http.put<Visit>(`${this.apiServerUrl}/visit/update`, visit);
  }

  public deleteVisit(visitCode: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/visit/delete/${visitCode}`);
  }

  getVisitsStatistics(visits: Visit[], period: string): { count: number; visits: Visit[] } {
    const currentDate = new Date();
    let startDate, endDate;
  
    if (period === 'week') {
      startDate = startOfWeek(currentDate);
      endDate = endOfWeek(currentDate);
    } else if (period === 'month') {
      startDate = startOfMonth(currentDate);
      endDate = endOfMonth(currentDate);
    } else if (period === 'day') {
      startDate = startOfDay(currentDate);
      endDate = endOfDay(currentDate);
    } else {
      startDate = new Date(0); // Si la période n'est pas spécifiée, utilisez une date très ancienne
      endDate = currentDate;
    }
  
    const filteredVisits = this.filterVisitsByPeriod(visits, startDate, endDate);
  
    return {
      count: filteredVisits.length,
      visits: filteredVisits,
    };
  }

  private filterVisitsByPeriod(visits: Visit[], startDate: Date, endDate: Date): Visit[] {
    return visits.filter((visit) => {
      const visitDate = new Date(visit.date);
      return visitDate >= startDate && visitDate <= endDate;
    });
  }
}

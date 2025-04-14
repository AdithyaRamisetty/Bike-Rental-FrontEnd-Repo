import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Bike } from '../Models/bike';

@Injectable({
  providedIn: 'root'
})
export class BikeService {
  private baseUrl = 'https://localhost:7171/api/Bikes';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Bike[]> {
    return this.http.get<Bike[]>(this.baseUrl);
  }

  getById(id: number): Observable<Bike> {
    return this.http.get<Bike>(`${this.baseUrl}/${id}`);
  }

  create(bike: Bike): Observable<Bike> {
    return this.http.post<Bike>(this.baseUrl, bike);
  }

  update(id: number, bike: Bike): Observable<Bike> {
    return this.http.put<Bike>(`${this.baseUrl}/${id}`, bike);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

}

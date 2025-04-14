import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rental } from '../Models/rental';

@Injectable({
  providedIn: 'root'
})
export class RentalService {

  private baseUrl= 'https://localhost:7171/api/Rentals';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Rental[]> {
    return this.http.get<Rental[]>(this.baseUrl);
  }

  getById(id: number): Observable<Rental> {
    return this.http.get<Rental>(`${this.baseUrl}/${id}`);
  }

  create(rental: Rental): Observable<Rental> {
    return this.http.post<Rental>(this.baseUrl, rental);
  }

  update(id: number, rental: Rental): Observable<Rental> {
    return this.http.put<Rental>(`${this.baseUrl}/${id}`, rental);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

}

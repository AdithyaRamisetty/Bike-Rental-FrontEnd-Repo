import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Payment } from '../Models/payment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private baseUrl = 'https://localhost:7171/api/Payments';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Payment[]> {
    return this.http.get<Payment[]>(this.baseUrl);
  }

  getById(id: number): Observable<Payment> {
    return this.http.get<Payment>(`${this.baseUrl}/${id}`);
  }

  create(payment: Payment): Observable<Payment> {
    return this.http.post<Payment>(this.baseUrl, payment);
  }

  update(id: number, payment: Payment): Observable<Payment> {
    return this.http.put<Payment>(`${this.baseUrl}/${id}`, payment);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}

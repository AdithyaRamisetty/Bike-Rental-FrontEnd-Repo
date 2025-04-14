import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Payment } from 'src/app/Models/payment';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-payments',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './payments.component.html',
  styleUrl: './payments.component.css'
})
export class PaymentsComponent {

  payments: Payment[] = [];
  selectedPayment: Payment | null = null;
  mode: 'list' | 'create' | 'edit' | 'view' = 'list';

  formData: Payment = {
    paymentId: 0,
    rentalId: 0,
    paymentDate: new Date(),
    amountPaid: 0,
    paymentStatus: ''
  };

  constructor(private paymentService: PaymentService) {}

  ngOnInit(): void {
    this.loadPayments();
  }

  loadPayments(): void {
    this.paymentService.getAll().subscribe({
      next: (data) => this.payments = data,
      error: (err) => console.error('Error loading payments:', err)
    });
  }

  goToCreate(): void {
    this.mode = 'create';
    this.formData = {
      paymentId: 0,
      rentalId: 0,
      paymentDate: new Date(),
      amountPaid: 0,
      paymentStatus: ''
    };
  }

  goToDetails(payment: Payment): void {
    this.selectedPayment = payment;
    this.mode = 'view';
  }

  goToEdit(payment: Payment): void {
    this.formData = { ...payment };
    this.mode = 'edit';
  }

  onDelete(id: number): void {
    if (confirm('Are you sure you want to delete this payment?')) {
      this.paymentService.delete(id).subscribe(() => {
        this.loadPayments();
        this.mode = 'list';
      });
    }
  }

  savePayment(): void {
    if (this.mode === 'create') {
      this.paymentService.create(this.formData).subscribe(() => {
        this.loadPayments();
        this.mode = 'list';
      });
    } else if (this.mode === 'edit') {
      this.paymentService.update(this.formData.paymentId, this.formData).subscribe(() => {
        this.loadPayments();
        this.mode = 'list';
      });
    }
  }

  cancel(): void {
    this.mode = 'list';
    this.selectedPayment = null;
  }

  formatDateForInput(date: Date): string {
    return new Date(date).toISOString().slice(0, 16);
  }
}

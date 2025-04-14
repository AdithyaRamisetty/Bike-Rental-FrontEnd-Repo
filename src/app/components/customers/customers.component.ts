import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Customer } from 'src/app/Models/customer';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css'
})
export class CustomersComponent {
  customers: Customer[] = [];
  selectedCustomer: Customer | null = null;
  mode: 'list' | 'create' | 'edit' | 'view' = 'list';

  formData: Customer = {
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  };

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers(): void {
    this.customerService.getAll().subscribe({
      next: (data) => {
        console.log('Fetched customers:', data); // ✅ Debug line
        this.customers = data;
      },
      error: (err) => {
        console.error('Error loading customers:', err); // ✅ Shows backend error
      }
    });
  }

  goToCreate(): void {
    this.mode = 'create';
    this.formData = {
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    };
  }

  goToDetails(customer: Customer): void {
    this.selectedCustomer = customer;
    this.mode = 'view';
  }

  goToEdit(customer: Customer): void {
    this.formData = { ...customer };
    this.mode = 'edit';
  }

  onDelete(id: number): void {
    if (confirm('Are you sure you want to delete this customer?')) {
      this.customerService.delete(id).subscribe(() => {
        this.loadCustomers();
        this.mode = 'list';
      });
    }
  }

  saveCustomer(): void {
    if (this.mode === 'create') {
      this.customerService.create(this.formData).subscribe(() => {
        this.loadCustomers();
        this.mode = 'list';
      });
    } else if (this.mode === 'edit' && this.formData.customerId) {
      this.customerService.update(this.formData.customerId, this.formData).subscribe(() => {
        this.loadCustomers();
        this.mode = 'list';
      });
    }
  }

  cancel(): void {
    this.mode = 'list';
    this.selectedCustomer = null;
    this.formData = {
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    };
  }
}

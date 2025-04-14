import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Rental } from 'src/app/Models/rental';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-rentals',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './rentals.component.html',
  styleUrl: './rentals.component.css'
})
export class RentalsComponent {
  rentals: Rental[] = [];
  selectedRental: Rental | null = null;
  mode: 'list' | 'create' | 'edit' | 'view' = 'list';

  formData: Rental = {
    rentalId: 0,
    customerId: 0,
    bikeId: 0,
    rentalStartTime: new Date(),
    rentalEndTime: new Date(),
    totalAmount: 0
  };

  constructor(private rentalService: RentalService) {}

  ngOnInit(): void {
    this.loadRentals();
  }

  loadRentals(): void {
    this.rentalService.getAll().subscribe({
      next: (data) => this.rentals = data,
      error: (err) => console.error('Error loading rentals:', err)
    });
  }

  goToCreate(): void {
    this.mode = 'create';
    this.formData = {
      rentalId: 0,
      customerId: 0,
      bikeId: 0,
      rentalStartTime: new Date(),
      rentalEndTime: new Date(),
      totalAmount: 0
    };
  }

  goToDetails(rental: Rental): void {
    this.selectedRental = rental;
    this.mode = 'view';
  }

  goToEdit(rental: Rental): void {
    this.formData = { ...rental };
    this.mode = 'edit';
  }

  onDelete(id: number): void {
    if (confirm('Are you sure you want to delete this rental?')) {
      this.rentalService.delete(id).subscribe(() => {
        this.loadRentals();
        this.mode = 'list';
      });
    }
  }

  saveRental(): void {
    if (this.mode === 'create') {
      this.rentalService.create(this.formData).subscribe(() => {
        this.loadRentals();
        this.mode = 'list';
      });
    } else if (this.mode === 'edit') {
      this.rentalService.update(this.formData.rentalId, this.formData).subscribe(() => {
        this.loadRentals();
        this.mode = 'list';
      });
    }
  }

  cancel(): void {
    this.mode = 'list';
    this.selectedRental = null;
  }

  formatDateForInput(date: Date): string {
    return new Date(date).toISOString().slice(0, 16);
  }
}

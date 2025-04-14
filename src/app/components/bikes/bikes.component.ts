import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Bike } from 'src/app/Models/bike';
import { BikeService } from 'src/app/services/bike.service';

@Component({
  selector: 'app-bikes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './bikes.component.html',
  styleUrl: './bikes.component.css'
})
export class BikesComponent {
  bikes: Bike[] = [];
  selectedBike: Bike | null = null;
  mode: 'list' | 'create' | 'edit' | 'view' = 'list';

  formData: Bike = {
    bikeId: 0,
    bikeModel: '',
    rentalPricePerHour: 0,
    availabilityStatus: true
  };

  constructor(private bikeService: BikeService) {}

  ngOnInit(): void {
    this.loadBikes();
  }

  loadBikes(): void {
    this.bikeService.getAll().subscribe({
      next: (data) => this.bikes = data,
      error: (err) => console.error('Error loading bikes:', err)
    });
  }

  goToCreate(): void {
    this.mode = 'create';
    this.formData = {
      bikeId: 0,
      bikeModel: '',
      rentalPricePerHour: 0,
      availabilityStatus: true
    };
  }

  goToDetails(bike: Bike): void {
    this.selectedBike = bike;
    this.mode = 'view';
  }

  goToEdit(bike: Bike): void {
    this.formData = { ...bike };
    this.mode = 'edit';
  }

  onDelete(id: number): void {
    if (confirm('Are you sure you want to delete this bike?')) {
      this.bikeService.delete(id).subscribe(() => {
        this.loadBikes();
        this.mode = 'list';
      });
    }
  }

  saveBike(): void {
    if (this.mode === 'create') {
      this.bikeService.create(this.formData).subscribe(() => {
        this.loadBikes();
        this.mode = 'list';
      });
    } else if (this.mode === 'edit') {
      this.bikeService.update(this.formData.bikeId, this.formData).subscribe(() => {
        this.loadBikes();
        this.mode = 'list';
      });
    }
  }

  cancel(): void {
    this.mode = 'list';
    this.selectedBike = null;
    this.formData = {
      bikeId: 0,
      bikeModel: '',
      rentalPricePerHour: 0,
      availabilityStatus: true
    };
  }
}

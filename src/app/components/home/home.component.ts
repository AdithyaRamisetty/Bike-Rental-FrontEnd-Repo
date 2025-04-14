import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BikeService } from 'src/app/services/bike.service';
import { CustomerService } from 'src/app/services/customer.service';
import { PaymentService } from 'src/app/services/payment.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  customerCount = 0;
  availableBikeCount = 0;
  ongoingRentalsCount = 0;
  totalPayments = 0;

  constructor(
    private customerService: CustomerService,
    private bikeService: BikeService,
    private rentalService: RentalService,
    private paymentService: PaymentService
  ) {}

  ngOnInit(): void {
    this.customerService.getAll().subscribe(data => {
      this.customerCount = data.length;
    });

    this.bikeService.getAll().subscribe(data => {
      this.availableBikeCount = data.filter(b => b.availabilityStatus).length;
    });

    this.rentalService.getAll().subscribe(data => {
      this.ongoingRentalsCount = data.filter(r => !r.rentalEndTime).length;
    });

    this.paymentService.getAll().subscribe(data => {
      this.totalPayments = data.reduce((sum, p) => sum + p.amountPaid, 0);
    });
  }
}

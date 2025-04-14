import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomerService } from './services/customer.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CustomersComponent } from './components/customers/customers.component';
import { BikesComponent } from './components/bikes/bikes.component';
import { RentalsComponent } from './components/rentals/rentals.component';
import { PaymentsComponent } from './components/payments/payments.component';
import { BikeService } from './services/bike.service';
import { RentalService } from './services/rental.service';
import { PaymentService } from './services/payment.service';
import { HomeComponent } from './components/home/home.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    CustomersComponent,
    BikesComponent,
    RentalsComponent,
    PaymentsComponent,
    HomeComponent
  ],
  providers: [ CustomerService,
    BikeService,
    RentalService,
    PaymentService],
  bootstrap: [AppComponent]
})
export class AppModule { }

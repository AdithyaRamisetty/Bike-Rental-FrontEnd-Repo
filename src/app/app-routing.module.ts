import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomersComponent } from './components/customers/customers.component';
import { BikesComponent } from './components/bikes/bikes.component';
import { RentalsComponent } from './components/rentals/rentals.component';
import { PaymentsComponent } from './components/payments/payments.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [ { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'customers', component: CustomersComponent },
  { path: 'bikes', component: BikesComponent },
  { path: 'rentals', component: RentalsComponent },
  { path: 'payments', component: PaymentsComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

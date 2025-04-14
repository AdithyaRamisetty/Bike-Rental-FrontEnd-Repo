import { Rental } from "./rental";

export interface Payment {
    paymentId: number;
    rentalId: number;
    paymentDate: Date;
    amountPaid: number;
    paymentStatus: string;
    rental?: Rental;
  }
  
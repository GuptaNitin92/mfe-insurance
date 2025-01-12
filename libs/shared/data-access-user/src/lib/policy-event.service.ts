import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PolicyEventService {
  private paymentEventSubject = new Subject<void>();

  // Observable to notify about policy payment
  paymentEvent$ = this.paymentEventSubject.asObservable();

  // Emit event when a policy payment is made
  notifyPayment() {
    this.paymentEventSubject.next();
  }
}

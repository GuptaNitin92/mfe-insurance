import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UserService, IndexedDBService} from '@mfe-insurance/data-access-user';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-policyDetails-entry',
  templateUrl: './policyDetails.component.html',
  styleUrls: ['./policyDetails.component.scss'],
  imports: [CommonModule]
})
export class RemoteEntryComponent implements OnInit {
  private indexedDbService = inject(IndexedDBService);
  private userService = inject(UserService);

  policies: Array<any> = [];

  constructor(private route: Router){}

  async ngOnInit() {
    try {
      const loggedInUser = await this.getLoggedInUser();
      if (loggedInUser) {
        this.policies = await this.indexedDbService.getPoliciesForUser(loggedInUser);
      }
    } catch (error) {
      console.error('Error fetching policies:', error);
    }
  }

  async getLoggedInUser(): Promise<string | null> {
    return new Promise((resolve) => {
      this.userService.isUserLoggedIn$.subscribe((isLoggedIn) => {
        if (isLoggedIn) {
          const username = localStorage.getItem('loggedInUser');
          resolve(username);
        } else {
          resolve(null);
        }
      });
    });
  }

  // async markAsPaid(policyId: string) {
  //   try {
  //     await this.indexedDbService.markPolicyAsPaid(policyId);
  //     this.policies = this.policies.map((policy) =>
  //       policy.id === policyId ? { ...policy, isPaid: true } : policy
  //     );
  //   } catch (error) {
  //     console.error('Error marking policy as paid:', error);
  //   }
  // }

  openPremiumPayment(policyNumber: string): void {
    // Navigate to Premium Payment Microfrontend
    this.route.navigate(['/premiumPayment'], {
      queryParams: { policyNumber },
    });
  }
  
}

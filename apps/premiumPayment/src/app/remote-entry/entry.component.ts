import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import {IndexedDBService, PolicyEventService} from '@mfe-insurance/data-access-user'

@Component({
  imports: [CommonModule],
  selector: 'app-premiumPayment-entry',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class RemoteEntryComponent implements OnInit {
  duePolicies: Array<any> = [];
  policies: Array<any> = [];
  showModal = false;

  constructor(
    private route: ActivatedRoute,
    private indexedDBService: IndexedDBService,
    private policyEventService: PolicyEventService
  ) {}

  async ngOnInit() {
    const selectedPolicyNumber = this.route.snapshot.queryParamMap.get(
      'policyNumber'
    );

    // Fetch all policies from IndexedDB
    await this.getDuePolicies();

    if (selectedPolicyNumber) {
      // Display only the selected policy for payment
      this.duePolicies = this.policies.filter(
        (policy) =>
          policy.policyNumber === selectedPolicyNumber && !policy.isPaid
      );
    } else {
      // Display all due policies
      this.duePolicies = this.policies;
    }
  }

  async getDuePolicies(){
    // Fetch all policies from IndexedDB
    try {
      const loggedInUser = await this.getLoggedInUser();
      if (loggedInUser) {
        this.policies = await this.indexedDBService.getPendingPolicies(loggedInUser);
      }
    } catch (error) {
      console.error('Error fetching policies:', error);
    }
  }

  async getLoggedInUser(): Promise<string | null> {
    return new Promise((resolve) => {
      const username = localStorage.getItem('loggedInUser');
          resolve(username);
          
      });
  }

  async payPolicy(policyid: string) {
    // Mark policy as paid
    //policy.isPaid = true;
    await this.indexedDBService.markPolicyAsPaid(policyid);
    this.showModal = true;

    // Remove policy from the list
    await this.getDuePolicies();
    this.duePolicies = this.policies;
    this.policyEventService.notifyPayment();

  }

  closeModal() {
    this.showModal = false;
  }
}

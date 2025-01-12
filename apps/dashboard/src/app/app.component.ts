import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { UserService, IndexedDBService, PolicyEventService } from "@mfe-insurance/data-access-user";
import { distinctUntilChanged } from 'rxjs/operators';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private indexDBService = inject(IndexedDBService);
  private userService = inject(UserService);
  private policyEventService = inject(PolicyEventService);
  private worker!: Worker;
  
  isLoggedIn$ = this.userService.isUserLoggedIn$;
  userName: string = '';
  activePolicyCount: number = 0;
  pendingPaymentCount: number = 0;

  constructor() {
    this.initializeDB();
    
  }

  async initializeDB() {
    try {
      await this.indexDBService.initializeData();
      console.log('IndexedDB initialized successfully.');
    } catch (error) {
      console.error('Error initializing IndexedDB:', error);
    }
    
  }

  async ngOnInit() {
    this.isLoggedIn$
      .pipe(distinctUntilChanged())
      .subscribe(async (loggedIn) => {
        // Queue the navigation after initialNavigation blocking is completed
        setTimeout(() => {
          if (!loggedIn) {
            this.router.navigateByUrl('login');
          } else {
            this.userName = localStorage.getItem('loggedInUser')!;
            this.initializeWorker();
            // Initial computation of policy counts
            this.updatePolicyCounts();
            this.router.navigateByUrl('policyDetails');
          }
        });
      });

      this.route.queryParams.subscribe((params) => {
        const policyNumber = params['policyNumber'];
        if (policyNumber) {
          // Navigate to the Premium Payment MFE with the policyNumber
          this.router.navigate(['/premiumPayment'], {
            queryParams: { policyNumber },
          });
        }
      });

      this.policyEventService.paymentEvent$.subscribe(() => {
        // Trigger policy count recomputation
        this.updatePolicyCounts();
      });
  
      
  }

  logout(){
    this.userService.logout();
  }

  initializeWorker() {
    if (typeof Worker !== 'undefined') {
      this.worker = new Worker(new URL('./policy-computation.worker', import.meta.url));

      this.worker.onmessage = ({ data }) => {
        this.activePolicyCount = data.activePolicies;
        this.pendingPaymentCount = data.pendingPayments;
      };
    }
  }

  async updatePolicyCounts() {
    if (this.worker) {
      
      const policy = await this.indexDBService.getPoliciesForUser(this.userName);
      this.worker.postMessage(policy);
    }
  }

  ngOnDestroy() {
    if (this.worker) {
      this.worker.terminate();
    }
  }
}
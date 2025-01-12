import { Injectable } from '@angular/core';
import { openDB, DBSchema } from 'idb';

interface InsuranceDB extends DBSchema {
  users: {
    key: string;
    value: { username: string; password: string };
  };
  policies: {
    key: string;
    value: {
      id: string;
      username: string;
      policyName: string;
      policyNumber: string;
      premiumAmount: number;
      issueDate: string;
      nextDueDate: string;
      paymentFrequency: string;
      maturityDate: string;
      policyTerm: string;
      isPaid: boolean;
    };
  };
}

@Injectable({ providedIn: 'root' })
export class IndexedDBService {
  private dbPromise = openDB<InsuranceDB>('insurance-db', 1, {
    upgrade(db) {
      db.createObjectStore('users', { keyPath: 'username' });
      db.createObjectStore('policies', { keyPath: 'id' });
    },
  });

  async addUser(username: string, password: string) {
    const db = await this.dbPromise;
    await db.put('users', { username, password });
  }

  async getUser(username: string) {
    const db = await this.dbPromise;
    return db.get('users', username);
  }

  async addPolicy(policy: InsuranceDB['policies']['value']) {
    const db = await this.dbPromise;
    await db.put('policies', policy);
  }

  async getPoliciesForUser(username: string) {
    const db = await this.dbPromise;
    return (await db.getAll('policies')).filter(policy => policy.username === username);
  }

  async getPendingPolicies(username: string) {
    const db = await this.dbPromise;
    return (await db.getAll('policies')).filter(
      policy => policy.username === username && !policy.isPaid
    );
  }

  async markPolicyAsPaid(policyNumber: string) {
    const db = await this.dbPromise;
    const policy = await db.get('policies', policyNumber);
    if (policy) {
      policy.isPaid = true;
      await db.put('policies', policy);
    }
  }

  async initializeData() {
    const sampleUsers = [
      { username: 'user1', password: 'pass1' },
      { username: 'user2', password: 'pass2' },
    ];
  
    const samplePolicies = [
      {
        id: 'policy1',
        username: 'user1',
        policyName: 'Life Insurance',
        policyNumber: 'L12345',
        premiumAmount: 5000,
        issueDate: '2022-01-01',
        nextDueDate: '2024-01-01',
        paymentFrequency: 'Yearly',
        maturityDate: '2040-01-01',
        policyTerm: '18 years',
        isPaid: false,
      },
      {
        id: 'policy2',
        username: 'user1',
        policyName: 'Car Insurance',
        policyNumber: 'C12345',
        premiumAmount: 3000,
        issueDate: '2023-06-01',
        nextDueDate: '2024-06-01',
        paymentFrequency: 'Yearly',
        maturityDate: '2029-06-01',
        policyTerm: '6 years',
        isPaid: true,
      },
      {
        id: 'policy3',
        username: 'user1',
        policyName: 'Health Insurance',
        policyNumber: 'H12345',
        premiumAmount: 4000,
        issueDate: '2023-01-01',
        nextDueDate: '2025-01-01',
        paymentFrequency: 'Yearly',
        maturityDate: '2035-01-01',
        policyTerm: '12 years',
        isPaid: false,
      },
      {
        id: 'policy4',
        username: 'user1',
        policyName: 'Home Insurance',
        policyNumber: 'H56789',
        premiumAmount: 7000,
        issueDate: '2020-01-01',
        nextDueDate: '2024-01-01',
        paymentFrequency: 'Yearly',
        maturityDate: '2030-01-01',
        policyTerm: '10 years',
        isPaid: true,
      },
      // User2 Policies
      {
        id: 'policy5',
        username: 'user2',
        policyName: 'Life Insurance',
        policyNumber: 'L67890',
        premiumAmount: 6000,
        issueDate: '2021-05-01',
        nextDueDate: '2023-05-01',
        paymentFrequency: 'Yearly',
        maturityDate: '2040-05-01',
        policyTerm: '19 years',
        isPaid: false,
      },
      {
        id: 'policy6',
        username: 'user2',
        policyName: 'Car Insurance',
        policyNumber: 'C56789',
        premiumAmount: 2500,
        issueDate: '2022-06-01',
        nextDueDate: '2024-06-01',
        paymentFrequency: 'Yearly',
        maturityDate: '2031-06-01',
        policyTerm: '9 years',
        isPaid: false,
      },
      {
        id: 'policy7',
        username: 'user2',
        policyName: 'Health Insurance',
        policyNumber: 'H56789',
        premiumAmount: 3500,
        issueDate: '2023-01-01',
        nextDueDate: '2025-01-01',
        paymentFrequency: 'Yearly',
        maturityDate: '2035-01-01',
        policyTerm: '12 years',
        isPaid: true,
      },
      // User3 Policies
      {
        id: 'policy8',
        username: 'user3',
        policyName: 'Life Insurance',
        policyNumber: 'L11111',
        premiumAmount: 4500,
        issueDate: '2020-12-01',
        nextDueDate: '2024-12-01',
        paymentFrequency: 'Yearly',
        maturityDate: '2039-12-01',
        policyTerm: '19 years',
        isPaid: false,
      },
      {
        id: 'policy9',
        username: 'user3',
        policyName: 'Health Insurance',
        policyNumber: 'H22222',
        premiumAmount: 3000,
        issueDate: '2023-03-01',
        nextDueDate: '2024-03-01',
        paymentFrequency: 'Yearly',
        maturityDate: '2035-03-01',
        policyTerm: '12 years',
        isPaid: false,
      },
      // User4 Policies
      {
        id: 'policy10',
        username: 'user4',
        policyName: 'Travel Insurance',
        policyNumber: 'T33333',
        premiumAmount: 2000,
        issueDate: '2022-01-01',
        nextDueDate: '2023-01-01',
        paymentFrequency: 'Yearly',
        maturityDate: '2028-01-01',
        policyTerm: '6 years',
        isPaid: true,
      },
      {
        id: 'policy11',
        username: 'user4',
        policyName: 'Health Insurance',
        policyNumber: 'H44444',
        premiumAmount: 5000,
        issueDate: '2021-06-01',
        nextDueDate: '2024-06-01',
        paymentFrequency: 'Yearly',
        maturityDate: '2035-06-01',
        policyTerm: '14 years',
        isPaid: false,
      },
      // User5 Policies
      {
        id: 'policy12',
        username: 'user5',
        policyName: 'Car Insurance',
        policyNumber: 'C55555',
        premiumAmount: 1800,
        issueDate: '2022-02-01',
        nextDueDate: '2024-02-01',
        paymentFrequency: 'Yearly',
        maturityDate: '2032-02-01',
        policyTerm: '10 years',
        isPaid: false,
      },
      {
        id: 'policy13',
        username: 'user5',
        policyName: 'Home Insurance',
        policyNumber: 'H66666',
        premiumAmount: 7000,
        issueDate: '2020-07-01',
        nextDueDate: '2023-07-01',
        paymentFrequency: 'Yearly',
        maturityDate: '2030-07-01',
        policyTerm: '10 years',
        isPaid: true,
      },
    ];
  
    for (const user of sampleUsers) {
      await this.addUser(user.username, user.password);
    }
  
    for (const policy of samplePolicies) {
      await this.addPolicy(policy);
    }
  }
  
}


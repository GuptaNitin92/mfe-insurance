import { Injectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {IndexedDBService} from './indexeddb.service';

@Injectable({ providedIn: 'root' })
export class UserService {
  private indexDbService = inject(IndexedDBService);
  private isUserLoggedIn = new BehaviorSubject(false);
  isUserLoggedIn$ = this.isUserLoggedIn.asObservable();

  async checkCredentials(username: string, password: string) {
    try {
      const user = await this.indexDbService.getUser(username);
      if (user && user.password === password) {
        this.isUserLoggedIn.next(true);
        localStorage.setItem('loggedInUser', user.username);
      } else {
        this.isUserLoggedIn.next(false);
        throw new Error('Invalid credentials'); // Optional: Throw error if needed
      }
    } catch (error) {
      console.error('Error in checkCredentials:', error);
      this.isUserLoggedIn.next(false);
      throw error;
    }
  }

  logout() {
    this.isUserLoggedIn.next(false);
  }
}
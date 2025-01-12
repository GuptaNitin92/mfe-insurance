import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from "@mfe-insurance/data-access-user";
import { inject } from '@angular/core';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  selector: 'app-login-entry',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class RemoteEntryComponent {
  
  username = '';
  password = '';
  errorMessage = '';
  private userService = inject(UserService);
  isLoggedIn$ = this.userService.isUserLoggedIn$;

  async login() {
    try {
      await this.userService.checkCredentials(this.username, this.password);
    } catch (error) {
      this.errorMessage = 'Invalid username or password. Please try again.';
    }
  }
}
import { Route } from '@angular/router';
import { AppComponent } from './app.component';

export const appRoutes: Route[] = [
  {
    path: 'login',
    loadChildren: () => import('login/Routes').then((m) => m!.remoteRoutes),
  },
  {
    path: 'premiumPayment',
    loadChildren: () =>
      import('premiumPayment/Routes').then((m) => m!.remoteRoutes),
  },
  {
    path: 'policyDetails',
    loadChildren: () =>
      import('policyDetails/Routes').then((m) => m!.remoteRoutes),
  },
  {
    path: '',
    component: AppComponent,
  },
];

import { Routes } from '@angular/router';

import { PageNotFoundComponent } from './error-routing/not-found/not-found.component';
import { UncaughtErrorComponent } from './error-routing/error/uncaught-error.component';
import { View1Component } from './view-1/view-1.component';
import { View2Component } from './view-2/view-2.component';

export const routes: Routes = [
  { path: '', redirectTo: 'view-1', pathMatch: 'full' },
  { path: 'error', component: UncaughtErrorComponent },
  { path: 'view-1', component: View1Component, data: { text: 'View-1' } },
  { path: 'view-2', component: View2Component, data: { text: 'View-2' } },
  { path: '**', component: PageNotFoundComponent } // must always be last
];

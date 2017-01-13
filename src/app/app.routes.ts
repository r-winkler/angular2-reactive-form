import { Routes } from '@angular/router';

import { EmployeeComponent } from './employee/employee.component';

export const rootRouterConfig: Routes = [
  { path: '', redirectTo: 'employee', pathMatch: 'full' },
  { path: 'employee', component: EmployeeComponent },
];


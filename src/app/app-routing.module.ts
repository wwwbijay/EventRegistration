import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationFormComponent } from './components/registration-form/registration-form.component';

const routes: Routes = [
  {
    component: RegistrationFormComponent,
    path: '',
    data: {
      title: 'Registration Form',
    },
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

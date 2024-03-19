import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonListComponent } from './person-list/person-list.component'; // Import PersonListComponent
import { WelcomeComponent } from './welcome/welcome.component';
import { PersonFormComponent } from './person-form/person-form.component';
import { PersonUpdateComponent } from './person-update/person-update.component';

const appRoutes: Routes = [
  { path: '', component: WelcomeComponent }, // Default route to WelcomeComponent
  { path: 'personen', component: PersonListComponent }, // Route to PersonListComponent
  { path: 'personen/add', component: PersonFormComponent },
  { path: 'personen/update', component: PersonUpdateComponent } // Route to PersonFormComponent for adding
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

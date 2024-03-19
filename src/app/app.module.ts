import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';

import { AppComponent } from './app.component';
import { PersonListComponent } from './person-list/person-list.component';
import { PersonService } from './person.service';
import { AppRoutingModule } from './app-routing.module';
import { WelcomeComponent } from './welcome/welcome.component';
import { PersonFormComponent } from './person-form/person-form.component';
import { PersonUpdateComponent } from './person-update/person-update.component';
// Import additional components here (optional)

@NgModule({
  declarations: [
    AppComponent,
    PersonListComponent,
    WelcomeComponent,
    PersonFormComponent,
    PersonUpdateComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    AppRoutingModule 
  ],
  providers: [PersonService],
  bootstrap: [AppComponent]
})
export class AppModule { }

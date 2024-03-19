import { Component, Input, OnInit } from '@angular/core';
import { Person } from '../person.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PersonService } from '../person.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-person',
  templateUrl: './person-update.component.html',
  styleUrls: ['./person-update.component.css']
})
export class PersonUpdateComponent implements OnInit {
  personForm: FormGroup;
  persons: Person[] = [];
  personToUpdate: Person | null = null;
  editMode: boolean = false; // Flag to indicate edit mode

  constructor(
    private fb: FormBuilder,
    private personService: PersonService,
    private route: ActivatedRoute,
    private router: Router
  ) { this.personForm = this.fb.group({
    vorname: ['', Validators.required],
    nachname: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]]
  });}

  ngOnInit(): void {
    this.persons = this.personService.getAllPersons();
    this.personForm = this.fb.group({
      vorname: ['', Validators.required],
      nachname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  updatePerson(person: Person) {
    this.personToUpdate = person;
    this.editMode = true; // Enter edit mode
  }

  saveChanges() {
    if (this.personForm.invalid) {
      return;
    }
    if (this.personToUpdate != null) {
      // Update the existing person object directly in the persons array
      const index = this.persons.findIndex(p => p.id === this.personToUpdate?.id);
      if (index !== -1) {
        this.persons[index] = { ...this.personToUpdate, ...this.personForm.value };
      }
  
      // Optionally update in PersonService (if applicable)
      this.personService.updatePerson(this.persons[index]);
  
      this.editMode = false; // Exit edit mode
    }
  }

}

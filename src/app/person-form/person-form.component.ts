import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Person } from '../person.model';
import { PersonService } from '../person.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.css']
})
export class PersonFormComponent implements OnInit {
  personForm: FormGroup;
  editMode = false;
  editedPersonId: string | null = null;
  showIdError = false; // Flag to show ID error message
  existingPerson : Person | null=null;

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
    this.personForm = this.fb.group({
      vorname: ['', Validators.required],
      nachname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.editMode = true;
        this.editedPersonId = id;
        const person = this.personService.getPersonById(parseInt(id));
        if (person) {
          this.personForm.patchValue(person);
        }
      }
    });
  }

  onSubmit() {
    if (this.personForm.invalid) {
      return;
    }

    const newPerson: Person = {
      ...this.personForm.value
    };

    if (this.editMode) {
      this.personService.updatePerson(newPerson);
    } else {
      const existingPerson = this.personService.getPersonById(newPerson.id);
      this.existingPerson = existingPerson || null;
      if (existingPerson) {
        this.showIdError = true; // Set flag to show error message
        return;
      }
      this.personService.addPerson(newPerson);
    }

    this.router.navigate(['/personen']);
  }
}

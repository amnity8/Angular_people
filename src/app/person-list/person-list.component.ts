import { Component, OnInit } from '@angular/core';
import { Person } from '../person.model';
import { PersonService } from '../person.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.css']
})
export class PersonListComponent implements OnInit {
  persons: Person[] = [];
  selectedPersonId: number | null = null; // Store selected person ID
  selectedPerson: Person | undefined; // Store fetched person details

  constructor(private personService: PersonService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.persons = this.personService.getAllPersons();
  }

  onPersonSelected(personId: number) {
    this.selectedPersonId = personId;
    this.selectedPerson = this.personService.getPersonById(personId);
  }

  
  async deletePerson(personId: number) {
    try {
      await this.personService.deletePerson(personId);
      this.persons = this.persons.filter(p => p.id !== personId); // Filter immediately
    } catch (error) {
      // Handle deletion error
    }
  }

  
}

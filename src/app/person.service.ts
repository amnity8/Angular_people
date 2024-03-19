import { Injectable } from '@angular/core';
import { Person } from './person.model';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  private persons: Person[] = [
    { id: 1, vorname: 'John', nachname: 'Doe', email: 'john.doe@example.com' },
    { id: 2, vorname: 'Jane', nachname: 'Smith', email: 'jane.smith@example.com' },
    // Add more mock data here
  ];

  getAllPersons(): Person[] {
    return this.persons.slice(); // Return a copy to avoid mutation
  }

  getPersonById(id: number): Person | undefined {
    return this.persons.find((person) => person.id === id) ;
  }

  addPerson(person: Person): void {
    // Generate a unique ID (you can use a library like uuid)
    person.id = this.persons.length + 1;
    this.persons.push(person);
  }

// PersonService.ts

updatePerson(updatedPerson: Person) {
  const index = this.persons.findIndex(p => p.id === updatedPerson.id);
  if (index !== -1) {
    this.persons[index] = updatedPerson; // Update person object in in-memory array
  }
}


  deletePerson(id: number): void {
    this.persons = this.persons.filter((person) => person.id !== id);
  }
  
}

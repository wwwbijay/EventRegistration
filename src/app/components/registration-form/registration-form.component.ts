import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss']
})
export class RegistrationFormComponent implements OnInit {

  performanceType!:string;
  pradeshLists = [
    { id: 1, title: 'Pradesh 1' },
    { id: 2, title: 'Pradesh 2' },
    { d: 3, title: 'Bagmati Pradesh' },
    { id: 4, title: 'Pradesh 4' },
    { id: 5, title: 'Pradesh 5' },
  ];
  constructor() { }

  ngOnInit(): void {
  }

}

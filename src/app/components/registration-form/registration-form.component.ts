import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CheckoutComponent } from 'src/app/dialogs/checkout/checkout.component';

@Component({
  selector: 'registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss']
})
export class RegistrationFormComponent implements OnInit {

  pradeshLists = [
    { id: 1, title: 'Pradesh 1' },
    { id: 2, title: 'Pradesh 2' },
    { d: 3, title: 'Bagmati Pradesh' },
    { id: 4, title: 'Pradesh 4' },
    { id: 5, title: 'Pradesh 5' },
  ];

  coverImage: any;
  coverImagePath!: string;

  constructor(
    private _router: Router,
    private _modalService: NgbModal,
  ) { }

  ngOnInit(): void {
    
  }

  

  registerForm = new FormGroup({
    fullname: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    address:new FormControl(),
    city:new FormControl(),
    pradesh:new FormControl(0),
    performanceType: new FormControl('', [Validators.required]),
    participantName: new FormControl(''),
    gender: new FormControl(0),
    age: new FormControl(''),
    groupName: new FormControl(''),
    noOfMembers: new FormControl(''),
    ageRange: new FormControl(''),
    groupType:new FormControl('')
  });

  get fullname() {
    return this.registerForm.get('fullname');
  }
  get phone() {
    return this.registerForm.get('phone');
  }
  get email() {
    return this.registerForm.get('email');
  }
  get performanceType() {
    return this.registerForm.get('performanceType');
  }
  get participantName() {
    return this.registerForm.get('participantName');
  }
  get gender() {
    return this.registerForm.get('gender');
  }
  get age() {
    return this.registerForm.get('age');
  }
  get groupName() {
    return this.registerForm.get('groupName');
  }
  get noOfMembers() {
    return this.registerForm.get('noOfMembers');
  }
  get ageRange() {
    return this.registerForm.get('ageRange');
  }
  get groupType() {
    return this.registerForm.get('groupType');
  }

  performanceTypeChange(e:any){
    if(e =='solo'){
      console.log(e);
      this.registerForm.get('groupName')?.clearValidators();
    }
    
  }

  uploadFile(e: any) {
    if (e.target.files.length > 0) {
      this.coverImage = e.target.files[0];

      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event: any) => {
        this.coverImagePath = event.target.result;
      };
      console.log(this.coverImagePath);
    }
  }

  register(){
    
    let formData: any = new FormData();
    
    if(this.registerForm.valid){

      let orderId = 12345678;
      const modalRef = this._modalService.open(CheckoutComponent);
      modalRef.componentInstance.orderId = orderId;



    }else {
      let invalidFields: any = [].slice.call(
        document.getElementsByClassName('ng-invalid')
      );
      invalidFields[1].focus();
    }
    
    
  }

}

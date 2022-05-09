import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChangePassword } from './changepassword.model';
import { CustomvalidationService } from './customvalidation.service';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {
  ChangePasswordData:any= new ChangePassword();
  changepasswordForm: FormGroup = new FormGroup({});
  submitted = false;
  constructor(public fb: FormBuilder,private customValidator: CustomvalidationService) {
  
   }

  ngOnInit(): void {
    this.changepasswordForm = this.fb.group({
      currentPassword: ['',[Validators.required]],
      newPassword: ['',[Validators.required]],
      confirmPassword: ['',[Validators.required]],
    },
    {
      // Here we create validators to be used for the group as a whole
      validator: this.customValidator.MustMatch('newPassword', 'confirmPassword')
    }
    );
  }
  get f(){
    return this.changepasswordForm.controls;
  }


  onSubmit()
  {
    this.submitted = true;

    // stop here if form is invalid
    if (this.changepasswordForm.invalid) {
        return;
    }

    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.changepasswordForm.value))
    
  }

   
}

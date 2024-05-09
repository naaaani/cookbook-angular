import { Component } from '@angular/core';
import { FormBuilder, FormGroup, NgModel, ReactiveFormsModule } from '@angular/forms';
import { UserServiceService } from '../user.service';
import {MatInputModule} from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-registration-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
    NgIf,
  ],
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})


export class RegistrationFormComponent {

  registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserServiceService,
  ){
    this.registerForm = this.formBuilder.group({
      username: '',
      password: '',
    });
  }

  register(): void {
    console.log(this.registerForm.value);
    this.userService.register(this.registerForm);
  }  
}


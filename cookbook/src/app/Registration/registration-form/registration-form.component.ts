import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserServiceService } from '../user.service';

@Component({
  selector: 'app-registration-form',
  standalone: true,
  imports: [ReactiveFormsModule],
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


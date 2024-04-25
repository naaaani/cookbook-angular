import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-registration-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './registration-form.component.html',
  styleUrl: './registration-form.component.css'
})
export class RegistrationFormComponent {

  registerForm = this.formBuilder.group({
    username: '',
    password: '',
  });

  constructor(
    private formBuilder : FormBuilder
  ){}

  onSubmit() : void {
    console.log(this.registerForm.value)
  }
}

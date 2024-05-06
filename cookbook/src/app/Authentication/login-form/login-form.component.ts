import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserServiceService } from '../user.service';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {

  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserServiceService,
  ){
    this.loginForm = this.formBuilder.group({
      username: '',
      password: '',
    });
  }

  login(): void {
    console.log(this.loginForm.value);
    this.userService.login(this.loginForm);
  }  
}

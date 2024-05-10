import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import {MatInputModule} from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { NgIf } from '@angular/common';


@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
    NgIf
  ],
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {

  loginForm: FormGroup;


  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router : Router, 
  ){
    this.loginForm = this.formBuilder.group({
      username: '',
      password: '',
    });
  }

  loggedIn: boolean = false;

  login(): void {
    this.userService.login(this.loginForm).then((data) => {
      if (data && data.token) {
        localStorage.setItem('token', data.token);
        this.loggedIn = true;
        this.router.navigate(['recipes']);
      } else {
        console.error('Login failed');
      }
    }).catch(error => {
      console.error('Login request failed:', error);
    });
  }
  logOut() : void {
    this.userService.logOut();
    this.loggedIn = false;
  }

}

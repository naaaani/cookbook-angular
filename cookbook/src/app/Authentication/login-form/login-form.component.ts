import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserServiceService } from '../user.service';
import { Router } from '@angular/router';

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
    private router : Router, 
  ){
    this.loginForm = this.formBuilder.group({
      username: '',
      password: '',
    });
  }

  login(): void {
     this.userService.login(this.loginForm).then((data =>localStorage.setItem('token', data.token)));
   // this.router.navigate(['/'])
  }  

  logOut() : void {
    this.userService.logOut();
  }

}

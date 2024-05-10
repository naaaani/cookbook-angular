import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

interface AuthResponse {
  username : string,
  token : string
}

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private loggedInSubject = new BehaviorSubject<boolean>(false);
  registerUrl = "/api/auth/register";
  loginUrl = "/api/auth/authenticate";
  isLoggedIn$ = this.loggedInSubject.asObservable();

  constructor() { 
  }

  setLoginStatus(status: boolean) {
    this.loggedInSubject.next(status);
  }

  setLoggedIn() {
    localStorage.setItem('loggedIn', JSON.stringify(true)); 
    this.setLoginStatus(true);
  }

  logOut() {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("token");
    this.setLoginStatus(false);
  }

  async register(formdata: FormGroup): Promise<JSON> {    
    const data = await fetch(
      this.registerUrl,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",          
        },
        body: JSON.stringify(formdata.value)
      }
    );
    return data.json() ?? [];
  }

  async login(formdata: FormGroup): Promise<AuthResponse> {    
    try {
      const response = await fetch(
        this.loginUrl,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",          
          },
          body: JSON.stringify(formdata.value)
        }
      );
  
      if (!response.ok) {
        throw new Error('Login failed');
      }
  
      this.setLoggedIn();
      return response.json();
    } catch (error) {
      console.error('Login request failed:', error);
      throw error; 
    }
  }
}
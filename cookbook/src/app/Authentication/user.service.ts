import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

interface AuthResponse {
  id: number,
  ok: boolean,
  username: string,
  token: string,
  error: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private loggedInSubject = new BehaviorSubject<boolean>(this.loadAuthState());
  isLoggedIn$ = this.loggedInSubject.asObservable();
  
  registerUrl = "/api/auth/register";
  loginUrl = "/api/auth/authenticate";

  constructor() {}

  setLoginStatus(status: boolean) {
    this.loggedInSubject.next(status);
  }

  logOut() {
    localStorage.removeItem("id");
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("token");
    this.setLoginStatus(false);
  }

  async register(formdata: FormGroup): Promise<any> {
    try {
      const response = await fetch(
        this.registerUrl,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formdata.value)
        }
      );
  
      if (!response.ok) {
        const responseBody = await response.json();
        if (responseBody.error === "Username is already taken") {
          throw new Error('Username is already taken');
        } else if (responseBody.error === "Password is too short") {
          throw new Error('Password is too short');
        } else {
          throw new Error('Registration failed');
        } 
      }
  
      return response;
    } catch (error) {
      console.error('Registration request failed:', error);
      throw error;
    }
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
        const errorMessage = await response.text();
        return {id: 0, ok: false, username: '', token: '', error: errorMessage}
      }
      
      const data = await response.json();

      if (data && data.token) {
        localStorage.setItem("id", data.id); 
        localStorage.setItem("token", data.token);
        localStorage.setItem('loggedIn', JSON.stringify(true));
        this.setLoginStatus(true);
      }
      
      return {id: data.id, ok: true, username: data.username, token: data.token, error: ''};

    } catch (err) {
      console.error('Login request failed:', err);
      return {id: 0, ok: false, username: '', token: '', error: "Something went wrong"}
    }
  }

  private loadAuthState(): boolean {
    const loggedIn = JSON.parse(localStorage.getItem('loggedIn') || 'false');
    const token = localStorage.getItem('token');
    return loggedIn && !!token;
  }
}

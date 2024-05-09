import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

interface AuthResponse {
  username : string,
  token : string
}

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {


  registerUrl = "/api/auth/register";
  loginUrl = "/api/auth/authenticate"

  constructor() { 
  }

  setLoggedIn() {
    localStorage.setItem('loggedIn', JSON.stringify(true)); 
  }


  logOut(){
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("token")
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
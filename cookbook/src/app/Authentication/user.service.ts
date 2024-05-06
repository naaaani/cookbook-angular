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
    const data = await fetch(
      this.loginUrl,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",          
        },
        body: JSON.stringify(formdata.value)
      }
    );
    
    if ( data.ok) { 
      this.setLoggedIn(); 
    }

    return data.json() ?? [];
  }
}
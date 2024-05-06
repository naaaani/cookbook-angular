import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  registerUrl = "/api/auth/register";
  loginUrl = "/api/auth/authenticate"

  constructor() { 
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

  async login(formdata: FormGroup): Promise<JSON> {    
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
    return data.json() ?? [];
  }
}
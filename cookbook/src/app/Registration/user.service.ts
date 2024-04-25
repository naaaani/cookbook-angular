import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  url = "/api/auth/register";

  constructor() { 
  }

  async register(formdata: FormGroup): Promise<JSON> {    
    const data = await fetch(
      this.url,
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
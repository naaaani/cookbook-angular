import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  url = "/api/auth/register";

  headers = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http: HttpClient) { 
  }

  register(form : FormGroup): void {
    console.log(this.url);
    
    this.http.post(this.url, form.value).subscribe((response) => {
      console.log('response', response)
    })
  }
}

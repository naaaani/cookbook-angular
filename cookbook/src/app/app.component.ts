import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RegistrationFormComponent } from './Registration/registration-form/registration-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RegistrationFormComponent ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'cookbook';
}

import { Component, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { UserService } from '../Authentication/user.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    MatToolbarModule,
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    NgIf
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})

export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false;
  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.userService.isLoggedIn$.subscribe(
      (status) => (this.isLoggedIn = status)
    );
  }

  logOut(): void {
    this.userService.logOut();
  }
}

import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";
import { NavbarComponent } from './navbar/navbar.component';
import { UserService } from './Authentication/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NavbarComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'cookbook';

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private userService: UserService,
    private router: Router
  ) {
    matIconRegistry.addSvgIcon(
      `gluten_free`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(`../../assets/icons/gluten-free-svgrepo-com.svg`)
    )
    matIconRegistry.addSvgIcon(
      `vegan`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(`../../assets/icons/vegan-svgrepo-com.svg`)
    )
    matIconRegistry.addSvgIcon(
      `dairy_free`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(`../../assets/icons/dairy-free-svgrepo-com.svg`)
    )
    matIconRegistry.addSvgIcon(
      `vegetarian`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(`../../assets/icons/food-no-meat-svgrepo-com.svg`)
    )
  }

  ngOnInit(): void {
    this.userService.isLoggedIn$.subscribe((isLoggedIn) => {
      if (!isLoggedIn) {
        this.router.navigate(['/login']);
      }  
    });
  }
}

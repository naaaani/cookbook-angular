import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    MatToolbarModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'cookbook';

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
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
}

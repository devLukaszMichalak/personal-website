import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss'],
})
export class MainMenuComponent {
  private router: Router = inject(Router);

  isSelected(menuOption: string) {
    return this.router.url.includes(menuOption);
  }
}

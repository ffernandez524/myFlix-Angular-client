import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {

  constructor(private router: Router) { }

  ngOnInit(): void { }

  navHome(): void {
    this.router.navigate(['movies']);
  }

  navProfile(): void {
    this.router.navigate(['profile']);
  }

  navLogout(): void {
    this.router.navigate(['welcome']);
    localStorage.clear();
  }

}

import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  constructor(private router: Router) {}
  lang_key = localStorage.getItem('lang_key') || 'en';
  showmenu() {
    document.querySelector('.sidnav')?.classList.add('showmenu');
  }
  hidemenu() {
    document.querySelector('.sidnav')?.classList.remove('showmenu');
  }
  changelanguage(lang: string) {
    localStorage.setItem('lang_key', lang);
    location.reload();
  }
  route(link: any) {
    this.router.navigateByUrl(link);
  }
}

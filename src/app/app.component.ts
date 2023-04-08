import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'new-nahidh-project';
  lang_key: string = localStorage.getItem('lang_key') || 'en';
  constructor() {
    localStorage.setItem('lang_key', localStorage.getItem('lang_key') || 'en');
    if (this.lang_key == 'en') {
      document
        .getElementsByTagName('body')[0]
        ?.setAttribute(
          'style',
          `font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif !important;direction: ltr;`
        );
    } else {
      document
        .getElementsByTagName('body')[0]
        ?.setAttribute(
          'style',
          `font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif !important;direction: rtl;`
        );
    }
  }
}

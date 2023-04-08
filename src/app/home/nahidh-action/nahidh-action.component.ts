import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nahidh-action',
  templateUrl: './nahidh-action.component.html',
  styleUrls: ['./nahidh-action.component.css'],
})
export class NahidhActionComponent implements OnInit {
  lang_key = localStorage.getItem('lang_key') || 'en';
  ngOnInit(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

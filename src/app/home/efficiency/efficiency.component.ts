import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-efficiency',
  templateUrl: './efficiency.component.html',
  styleUrls: ['./efficiency.component.css'],
})
export class EfficiencyComponent implements OnInit {
  lang_key = localStorage.getItem('lang_key') || 'en';
  ngOnInit(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  moveto(id: any) {
    window.scrollTo({
      top: document.getElementById(`section${id}`)?.offsetTop,
      behavior: 'smooth',
    });
    setTimeout(() => {
      this.reset_active_link();
      this.add_active_link(id);
    }, 5);
  }
  reset_active_link() {
    document
      .querySelector(`#sticky p:nth-of-type(1)`)
      ?.classList.remove('active');
    document
      .querySelector(`#sticky p:nth-of-type(2)`)
      ?.classList.remove('active');
    document
      .querySelector(`#sticky p:nth-of-type(3)`)
      ?.classList.remove('active');
  }
  add_active_link(id: any) {
    document
      .querySelector(`#sticky p:nth-of-type(${id})`)
      ?.classList.add('active');
  }
  remove_active_link(id: any) {
    document
      .querySelector(`#sticky p:nth-of-type(${id})`)
      ?.classList.remove('active');
  }
  @HostListener('window:scroll', ['$event']) // for window scroll events
  onScroll() {
    let sec1height = Number(
      `${document.getElementById(`section1`)?.offsetTop}`
    );
    let sec2height = Number(
      `${document.getElementById(`section2`)?.offsetTop}`
    );
    if (
      window.scrollY >= sec1height - 100 &&
      sec2height - 100 > window.scrollY
    ) {
      this.add_active_link(1);
    } else {
      this.remove_active_link(1);
    }
    if (window.scrollY >= sec2height - 100) {
      this.add_active_link(2);
    } else {
      this.remove_active_link(2);
    }
  }
}

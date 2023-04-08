import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css'],
})
export class ResultsComponent implements OnInit {
  lang_key = localStorage.getItem('lang_key') || 'en';
  content = 'videos';
  ngOnInit(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      this.make_section_background(this.lang_key);
    }, 20);
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
    document
      .querySelector(`#sticky p:nth-of-type(4)`)
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
  make_section_background(lang: string) {
    let window_width: number = Number(window.innerWidth);
    let sections_width: any =
      document.getElementsByClassName('sections')[0]?.clientWidth;
    let sticky_width: any = document.getElementById('sticky')?.clientWidth;
    let section_margin: number = (window_width - sections_width) / 2;
    console.log(sections_width * 0.4);
    if (this.lang_key == 'en') {
      document
        .querySelector('#section2')
        ?.setAttribute(
          'style',
          `margin: 0 -${section_margin - 9}px 0 -${
            section_margin + sticky_width + 20
          }px;padding: 50px ${section_margin - 9}px 50px ${
            section_margin + sticky_width + 20
          }px`
        );
    }
    if (this.lang_key == 'ar') {
      document.querySelector('#section2')?.setAttribute(
        'style',
        `margin: 0 -${section_margin + sticky_width + 20}px 0 -${
          section_margin - 9
        }px;
        padding: 50px ${section_margin + sticky_width + 20}px 50px ${
          section_margin - 9
        }px`
      );
    }
  }
  choosecontent(newcontent: any, id: any) {
    this.content = newcontent;
    document
      .querySelectorAll(`#resources-nav span`)[0]
      ?.classList.remove('selected');
    document
      .querySelectorAll(`#resources-nav span`)[1]
      ?.classList.remove('selected');
    document
      .querySelectorAll(`#resources-nav span`)[2]
      ?.classList.remove('selected');
    document
      .querySelectorAll(`#resources-nav span`)
      [id - 1]?.classList.add('selected');
  }
  @HostListener('window:scroll', ['$event']) // for window scroll events
  onScroll() {
    let sec1height = Number(
      `${document.getElementById(`section1`)?.offsetTop}`
    );
    let sec2height = Number(
      `${document.getElementById(`section2`)?.offsetTop}`
    );
    let sec3height = Number(
      `${document.getElementById(`section3`)?.offsetTop}`
    );
    let sec4height = Number(
      `${document.getElementById(`section4`)?.offsetTop}`
    );
    if (
      window.scrollY >= sec1height - 100 &&
      sec2height - 100 > window.scrollY
    ) {
      this.add_active_link(1);
    } else {
      this.remove_active_link(1);
    }
    if (
      window.scrollY >= sec2height - 100 &&
      sec3height - 100 > window.scrollY
    ) {
      this.add_active_link(2);
    } else {
      this.remove_active_link(2);
    }
    if (
      window.scrollY >= sec3height - 100 &&
      sec4height - 100 > window.scrollY
    ) {
      this.add_active_link(3);
    } else {
      this.remove_active_link(3);
    }
    if (window.scrollY >= sec4height - 100) {
      this.add_active_link(4);
    } else {
      this.remove_active_link(4);
    }
  }
  accordion(id: any) {
    document.querySelector(`.accordionbody${id}`)?.classList.toggle('show');
    document.querySelector(`.accordion${id}`)?.classList.toggle('rotateIcon');
  }
}

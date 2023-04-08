import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  lang_key = localStorage.getItem('lang_key') || 'en';
  width: number = 0;
  slideshow = ['first', 'second', 'third'];
  slidenumber = 0;
  slideinterval: any;
  ngOnInit(): void {
    if (this.lang_key == 'ar') {
      document
        .getElementById('welcome')
        ?.setAttribute(
          'style',
          `background-image: linear-gradient(to left, #eaf0f5, #fff);`
        );
    } else {
      document
        .getElementById('welcome')
        ?.setAttribute(
          'style',
          `background-image: linear-gradient(to right, #eaf0f5, #fff);`
        );
    }
    document
      .getElementById('first')
      ?.setAttribute(
        'style',
        `width: 0%;background-color: #171321;height: 100%;display: block;`
      );
    document
      .getElementById('second')
      ?.setAttribute(
        'style',
        `width: 0%;background-color: #171321;height: 100%;display: block;`
      );
    document
      .getElementById('third')
      ?.setAttribute(
        'style',
        `width: 0%;background-color: #171321;height: 100%;display: block;`
      );
    this.slideinterval = setInterval(() => {
      this.width += 0.1;
      document
        .getElementById(this.slideshow[this.slidenumber])
        ?.setAttribute(
          'style',
          `width: ${this.width}%;background-color: #171321;height: 100%;display: block;`
        );
      if (this.width >= 100) {
        this.width = 0;
        document
          .getElementById(this.slideshow[this.slidenumber])
          ?.setAttribute(
            'style',
            `width: ${this.width}%;background-color: #171321;height: 100%;display: block;`
          );
        this.slidenumber += 1;
        if (this.slidenumber == 3) {
          this.slidenumber = 0;
        }
      }
    }, 3);
  }
  accordion(id: any) {
    document.querySelector(`.accordionbody${id}`)?.classList.toggle('show');
    document.querySelector(`.accordion${id}`)?.classList.toggle('rotateIcon');
  }
  ngOnDestroy() {
    clearInterval(this.slideinterval);
  }
}

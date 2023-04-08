import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Swal, { SweetAlertPosition } from 'sweetalert2';
@Injectable({
  providedIn: 'root',
})
export class SweetAlertService {
  lang_key = localStorage.getItem('lang_key')
    ? localStorage.getItem('lang_key')
    : 'en';
  toastPosition: SweetAlertPosition =
    this.lang_key == 'en' ? 'top-end' : 'top-start';

  constructor(private router: Router) {}

  successToast(msg: string, time: number) {
    Swal.fire({
      title: msg,
      icon: 'success',
      toast: true,
      timer: time,
      position: this.toastPosition,
      showConfirmButton: false,
      timerProgressBar: true,
      didOpen: (toast: any) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      },
    });
  }

  errorToast(msg: string, time: number) {
    Swal.fire({
      title: msg,
      icon: 'error',
      toast: true,
      timer: time,
      position: this.toastPosition,
      showConfirmButton: false,
      timerProgressBar: true,
      didOpen: (toast: any) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      },
    });
  }

  warningToast(msg: string, time: number) {
    Swal.fire({
      title: msg,
      icon: 'warning',
      toast: true,
      timer: time,
      position: this.toastPosition,
      showConfirmButton: false,
      timerProgressBar: true,
      didOpen: (toast: any) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      },
    });
  }

  notifyToast(msg: any, time: number) {
    Swal.fire({
      title: msg?.notification?.title,
      text: msg?.notification?.body,
      iconHtml: `<img src="${msg?.notification?.image}" width="50px"/>`,
      toast: true,
      timer: time,
      position: this.toastPosition,
      showConfirmButton: false,
      timerProgressBar: true,
      didOpen: (toast: any) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
        toast.addEventListener('click', () => {
          this.router.navigate([msg?.data?.angular]);
        });
      },
    });
  }

  errorMessage(msg: string) {
    Swal.fire({
      icon: 'error',
      html: msg,
      showConfirmButton: true,
      /* confirmButtonText: this.lang.transform('lang_ok') */
    });
  }

  successMessage(msg: string) {
    Swal.fire({
      icon: 'success',
      html: msg,
      showConfirmButton: true,
      /* confirmButtonText: this.lang.transform('lang_ok') */
    });
  }

  confirmMessage(msg: string, confirmButtonTxt: any) {
    return Swal.fire({
      title: msg,
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: confirmButtonTxt,
    });
  }
}

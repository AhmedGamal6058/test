import { Injectable } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
@Injectable({
  providedIn: 'root',
})
export class FormManagerService {
  /**
   * Gets specific form control error message
   *
   * @param  form The targeted form (to get validator roles)
   * @param  formControlName The target to validate
   * @param  translationKey The field's title to be displayed
   */
  public getErrorMessage(
    form: any,
    formControlName: string,
    translationKey: string
  ) {
    let error = '';

    if (form.controls[formControlName].hasError('required')) {
      error = 'This field is required';
    }

    if (form.controls[formControlName].hasError('minlength')) {
      error =
        'Min length is ' +
        form.controls[formControlName].errors?.minlength.requiredLength;
    }

    if (form.controls[formControlName].hasError('maxlength')) {
      error =
        'Max length is ' +
        form.controls[formControlName].errors?.maxlength.requiredLength;
    }

    if (
      form.controls[formControlName].hasError('pattern') ||
      form.controls[formControlName].hasError('invalidNationalId')
    ) {
      error = 'Please enter a valid value';
    }

    if (form.controls[formControlName].hasError('invalidMatch')) {
      error = 'Invalid Match';
    }

    if (form.controls[formControlName].hasError('email')) {
      error = 'Invalid Email';
    }

    if (form.controls[formControlName].hasError('min')) {
      error =
        'Value must be more than ' + form.get(formControlName)?.errors?.min.min;
    }

    if (form.controls[formControlName].hasError('matDatepickerMin')) {
      const date = new Date(
        form.get(formControlName)?.errors?.matDatepickerMin.min
      );
      const minDate =
        date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();

      error = 'Please select a date after ' + minDate;
    }

    if (form.controls[formControlName].hasError('max')) {
      error =
        'Value must be less than ' +
        form.get(formControlName)?.errors?.max.max +
        1;
    }

    return error.toLowerCase();
  }

  /**
   * Marks all invalid form controls as touched in order to show validation errors
   *
   * @param  formGroup The target to validate
   */
  validateForm(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((field) => {
      const formField = formGroup.get(field);
      if (formField instanceof FormArray) {
        for (const formArrayControl of formField.controls) {
          if (formArrayControl instanceof FormControl) {
            formArrayControl.markAsTouched({
              onlySelf: true,
            });
          }
          if (formArrayControl instanceof FormGroup) {
            this.validateForm(formArrayControl);
          }
        }
      }
      if (formField instanceof FormControl) {
        formField.markAsTouched({
          onlySelf: true,
        });
      } else if (formField instanceof FormGroup) {
        this.validateForm(formField);
      }
    });
  }

  /**
   * Removes all null value fields from object (Mainly used on form submit)
   *
   * @param  obj The targeted object value
   */
  removeEmptyProperties(obj: any) {
    Object.keys(obj).forEach((key) => {
      if (obj[key] && typeof obj[key] === 'object') {
        this.removeEmptyProperties(obj[key]);
      } else if (obj[key] === null) {
        delete obj[key];
      }
    });

    return obj;
  }

  /**
   * Transforms JSON values to FormData
   *
   * @param  reqData The targeted request value
   */
  getFormData(reqData: any) {
    const requestFormData = new FormData();
    Object.keys(reqData).forEach((key) => {
      if (Array.isArray(reqData[key])) {
        reqData[key].forEach((item: any, i: number) => {
          if (Object.keys(item).length) {
            Object.keys(item).forEach((itemKey) => {
              requestFormData.append(
                key + '[' + i + ']' + '[' + itemKey + ']',
                item[itemKey]
              );
            });
          } else {
            requestFormData.append(key + '[' + i + ']', item);
          }
        });
      } else {
        requestFormData.append(key, reqData[key]);
      }
    });
    return requestFormData;
  }
}

import {
  FormGroup,
  AbstractControl,
  ValidatorFn,
  ValidationErrors,
  FormGroupDirective,
  FormControl,
  NgForm,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

export function hasError(
  form: FormGroup,
  controlName: string,
  errorKey: string
): boolean {
  const control = form.get(controlName) as AbstractControl;
  return (
    control?.invalid &&
    (control?.dirty || control?.touched) &&
    !!control?.errors?.[errorKey]
  );
}

export const validatePassword: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const password = control.get('password')?.value;
  const confirmPassword = control.get('confirmPassword')?.value;

  return password === confirmPassword ? null : { mismatch: true };
};

export const isMisMatchPassword = (form: FormGroup): boolean => {
  const passwordCtrl = form.get('password') as AbstractControl;
  const passwordConfirmCtrl = form.get('confirmPassword') as AbstractControl;

  return (
    (passwordCtrl?.touched || passwordCtrl?.dirty) &&
    (passwordConfirmCtrl?.touched || passwordConfirmCtrl?.dirty) &&
    form.errors?.['mismatch']
  );
};

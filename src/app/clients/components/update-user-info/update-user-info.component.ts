import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectUser } from '../../store/client.selectors';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { UserDataResponse } from 'src/app/shared/interfaces/user.interfaces';
import { updateUserInfos } from '../../store/client.actions';
import { MatDialogRef } from '@angular/material/dialog';
import { validatePassword } from 'src/app/shared/constants/validator';
import { updateUserData } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-update-user-info',
  templateUrl: './update-user-info.component.html',
  styleUrls: ['./update-user-info.component.scss'],
})
export class UpdateUserInfoComponent implements OnInit, OnDestroy {
  userInfoSubscription: Subscription | undefined;
  userInfo$!: UserDataResponse | null;
  nameForm!: FormGroup;
  emailForm!: FormGroup;
  passwordForm!: FormGroup;

  constructor(
    private readonly store: Store,
    private readonly fb: FormBuilder,
    private dialogRef: MatDialogRef<UpdateUserInfoComponent>
  ) {}

  ngOnInit(): void {
    this.userInfoSubscription = this.store
      .select(selectUser)
      .subscribe((user) => {
        this.userInfo$ = user;
      });

    this.nameForm = this.fb.group({
      name: [
        this.userInfo$?.name,
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(50),
        ],
      ],
    });

    this.emailForm = this.fb.group({
      email: [
        this.userInfo$?.email,
        [
          Validators.required,
          Validators.pattern('^[\\w-.]+@([\\w-]+\\.)+[\\w-]{2,4}$'),
        ],
      ],
    });

    this.passwordForm = this.fb.group({
      oldPassword: [
        '',
        [Validators.required, Validators.pattern('^[A-Za-z0-9]{8,30}$')],
      ],
      newPassword: ['', [Validators.pattern('^[A-Za-z0-9]{8,30}$')]],
      confirmNewPassword: [
        '',
        [Validators.required, this.validateNewPasswordConfirmation.bind(this)],
      ],
    });
  }

  ngOnDestroy(): void {
    this.userInfoSubscription?.unsubscribe();
  }

  onFormNameSubmit() {
    if (this.nameForm.invalid) return;
    const data = { name: this.nameForm.value.name };
    this.store.dispatch(updateUserInfos({ payload: data }));
  }

  onEmailFormSubmit() {
    if (this.emailForm.invalid) return;
    const data = { email: this.emailForm.value.email };
    this.store.dispatch(updateUserInfos({ payload: data }));
  }

  onPasswordFormSubmit() {
    if (this.passwordForm.invalid) return;
    const data = {
      oldPassword: this.passwordForm.value.oldPassword,
      newPassword: this.passwordForm.value.newPassword,
      // confirmNewPassword: this.passwordForm.value.confirmNewPassword,
    };
    this.store.dispatch(updateUserInfos({ payload: data }));
  }

  validateNewPasswordConfirmation(
    control: AbstractControl
  ): ValidationErrors | null {
    const newPassword = control.get('newPassword')?.value;
    const confirmNewPassword = control.get('confirmNewPassword')?.value;

    if (newPassword !== confirmNewPassword) {
      return { passwordMismatch: true };
    }

    return null;
  }

  hasControlError(controlName: string, errorName: string): boolean {
    const control = this.nameForm.get(controlName);
    return control?.errors?.[errorName];
  }

  closeDialog() {
    this.dialogRef.close();
  }
}

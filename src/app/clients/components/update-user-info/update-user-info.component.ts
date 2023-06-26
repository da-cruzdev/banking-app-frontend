import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectUser } from '../../store/client.selectors';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { UserDataResponse } from 'src/app/shared/interfaces/user.interfaces';
import { updateUserInfos } from '../../store/client.actions';
import { MatDialogRef } from '@angular/material/dialog';

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
      oldPassword: [''],
      newPassword: [''],
      confirmNewPassword: [''],
    });
  }

  ngOnDestroy(): void {
    this.userInfoSubscription?.unsubscribe();
  }

  onFormNameSubmit() {
    const data = { name: this.nameForm.value.name };
    this.store.dispatch(updateUserInfos({ payload: data }));
    // this.nameForm.reset();
  }

  onEmailFormSubmit() {
    const data = { email: this.emailForm.value.email };
    this.store.dispatch(updateUserInfos({ payload: data }));
  }

  hasControlError(controlName: string, errorName: string): boolean {
    const control = this.nameForm.get(controlName);
    return control?.errors?.[errorName];
  }

  closeDialog() {
    this.dialogRef.close();
  }
}

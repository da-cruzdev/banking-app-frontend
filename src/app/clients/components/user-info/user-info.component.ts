import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserDataResponse } from 'src/app/shared/interfaces/user.interfaces';
import { UpdateUserInfoComponent } from '../update-user-info/update-user-info.component';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
})
export class UserInfoComponent implements OnInit {
  @Input() userData!: UserDataResponse | null;

  constructor(private readonly dialog: MatDialog) {}

  ngOnInit(): void {}

  openDialog() {
    console.log('===========> Je suisn ici');

    this.dialog.open(UpdateUserInfoComponent, {
      width: '550px',
      height: '100vh',
      position: {
        right: '0',
      },
    });
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { UserDataResponse } from 'src/app/shared/interfaces/user.interfaces';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
})
export class UserInfoComponent implements OnInit {
  @Input() userData!: UserDataResponse | null;

  constructor() {}

  ngOnInit(): void {}
}

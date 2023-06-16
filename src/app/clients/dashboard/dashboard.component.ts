import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { GetUser } from '../store/client.actions';
import { selectUser } from '../store/client.reducer';
import { UserDataResponse } from 'src/app/shared/interfaces/user.interfaces';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  userInfo$!: Observable<UserDataResponse | null>;

  constructor(private readonly store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(GetUser());
    this.userInfo$ = this.store.select(selectUser);
  }
}

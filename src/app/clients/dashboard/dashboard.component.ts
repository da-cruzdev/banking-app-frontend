import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { GetUser, getUserAccounts } from '../store/client.actions';
import { selectAccounts, selectUser } from '../store/client.reducer';
import { UserDataResponse } from 'src/app/shared/interfaces/user.interfaces';
import { Observable } from 'rxjs';
import { AccountsDataResponse } from 'src/app/shared/interfaces/accounts.interfaces';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  userInfo$!: Observable<UserDataResponse | null>;
  userAccounts$!: Observable<AccountsDataResponse | null>;

  constructor(private readonly store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(GetUser());
    this.userInfo$ = this.store.select(selectUser);

    this.userInfo$.subscribe((userInfo) => {
      if (userInfo) {
        const id = userInfo.id;
        this.store.dispatch(getUserAccounts({ id: id.toString() }));
      }
    });
    this.userAccounts$ = this.store.select(selectAccounts);
  }
}

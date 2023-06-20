import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  GetUser,
  createSubAccount,
  getUserAccounts,
} from '../store/client.actions';
import {
  selectMainAccount,
  selectSubAccounts,
  selectUser,
} from '../store/client.reducer';
import { UserDataResponse } from 'src/app/shared/interfaces/user.interfaces';
import { map } from 'rxjs/operators';

import {
  AccountsDataResponse,
  createSubAccountData,
} from 'src/app/shared/interfaces/accounts.interfaces';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  userInfo$!: Observable<UserDataResponse | null>;
  mainAccount$!: Observable<AccountsDataResponse | null>;
  subAccounts$!: Observable<AccountsDataResponse[] | null>;

  constructor(
    private readonly store: Store,
    private readonly router: Router,
    private readonly toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.store.dispatch(GetUser());
    this.userInfo$ = this.store.select(selectUser);

    this.userInfo$.subscribe((userInfo) => {
      if (userInfo) {
        const id = userInfo.id;
        this.store.dispatch(getUserAccounts({ id: id.toString() }));
      }
    });
    this.mainAccount$ = this.store.select(selectMainAccount);
    this.subAccounts$ = this.store.select(selectSubAccounts);
    this.subAccounts$.subscribe((subAccounts) => {
      console.log(subAccounts);
    });
  }

  getSubAccountData(index: number): Observable<AccountsDataResponse | null> {
    return this.subAccounts$.pipe(
      map((subAccounts) => (subAccounts ? subAccounts[index] : null))
    );
  }

  handleSubAccountCreated(accountType: string) {
    this.mainAccount$.subscribe((accounts) => {
      console.log(accounts);

      if (accounts && accounts) {
        const accountIban = accounts.iban;
        console.log(accountIban);

        const payload: createSubAccountData = { accountIban, accountType };
        this.store.dispatch(createSubAccount({ payload }));
      }
    });
  }

  logout() {
    localStorage.removeItem('@token');
    this.toastrService.success('Déconnexion réussie');
    this.router.navigate(['/auth/login']);
  }
}

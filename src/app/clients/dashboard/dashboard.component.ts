import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import {
  GetUser,
  blockSubAccount,
  createSubAccount,
  getUserAccounts,
  unblockSubAccount,
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
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  userInfoSubscription: Subscription | undefined;
  mainAccountSubscription: Subscription | undefined;
  subAccountsSubscription: Subscription | undefined;

  userInfo$!: Observable<UserDataResponse | null>;
  mainAccount$!: Observable<AccountsDataResponse | null>;
  subAccounts$!: Observable<AccountsDataResponse[] | null>;
  subAccountsToShow: AccountsDataResponse[] = [];

  i: number = 0;

  constructor(
    private readonly store: Store,
    private readonly router: Router,
    private readonly toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.store.dispatch(GetUser());
    this.userInfo$ = this.store.select(selectUser);
    this.store.dispatch(getUserAccounts());

    this.mainAccount$ = this.store.select(selectMainAccount);
    this.mainAccountSubscription = this.mainAccount$.subscribe();

    this.subAccounts$ = this.store.pipe(select(selectSubAccounts));
    this.subAccountsSubscription = this.subAccounts$.subscribe(
      (subAccounts) => {
        this.subAccountsToShow = subAccounts?.slice(0, 2) || [];
      }
    );
  }

  ngOnDestroy(): void {
    this.userInfoSubscription?.unsubscribe();
    this.mainAccountSubscription?.unsubscribe();
    this.subAccountsSubscription?.unsubscribe();
  }

  getSubAccountData(index: number): Observable<AccountsDataResponse | null> {
    return this.subAccounts$.pipe(
      map((subAccounts) => (subAccounts ? subAccounts[index] : null))
    );
  }

  handleSubAccountCreated(accountType: string) {
    this.mainAccountSubscription = this.mainAccount$.subscribe((accounts) => {
      if (accounts && accounts) {
        const accountIban = accounts.iban;

        const payload: createSubAccountData = { accountIban, accountType };
        this.store.dispatch(createSubAccount({ payload }));
      }
    });
  }

  onBlockSubAccount(iban: string) {
    console.log(iban);

    this.store.dispatch(blockSubAccount({ iban: iban }));
  }

  unBlockSubAccount(iban: string) {
    this.store.dispatch(unblockSubAccount({ iban: iban }));
  }

  logout() {
    localStorage.removeItem('@token');
    this.toastrService.success('Déconnexion réussie');
    this.router.navigate(['/auth/login']);
  }
}

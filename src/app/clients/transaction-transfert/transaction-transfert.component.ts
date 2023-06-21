import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectMainAccount, selectSubAccounts } from '../store/client.reducer';
import { AccountsDataResponse } from 'src/app/shared/interfaces/accounts.interfaces';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-transaction-transfert',
  templateUrl: './transaction-transfert.component.html',
  styleUrls: ['./transaction-transfert.component.scss'],
})
export class TransactionTransfertComponent implements OnInit {
  showBalance: boolean = true;
  mainAccount: AccountsDataResponse | null = null;
  subAccounts: AccountsDataResponse[] | null = null;
  accounts: AccountsDataResponse[] = [];
  selectedAccount: AccountsDataResponse | null = null;

  constructor(private readonly store: Store) {}

  ngOnInit(): void {
    this.store.select(selectMainAccount).subscribe((account) => {
      if (account) {
        this.accounts.push(account);
        this.mainAccount = account;
        this.selectedAccount = account;
      }
    });

    this.store.select(selectSubAccounts).subscribe((accounts) => {
      if (accounts) {
        this.accounts = this.accounts.concat(accounts);
        this.subAccounts = accounts;
      }
    });
  }

  updateSelectedAccount(account: AccountsDataResponse) {
    this.selectedAccount = account;
  }

  toggleBalanceVisibility(): void {
    this.showBalance = !this.showBalance;
  }
}

import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Observable } from 'rxjs';
import { AccountsDataResponse } from 'src/app/shared/interfaces/accounts.interfaces';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit, OnChanges {
  showBalance: boolean = false;
  @Input() accountData$!: Observable<AccountsDataResponse | null>;
  @Input() subAccountData!: AccountsDataResponse | null;

  @Output() subAccountCreated: EventEmitter<string> =
    new EventEmitter<string>();
  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {}
  ngOnInit(): void {
    this.accountData$.subscribe((accountData) => {
      console.log(accountData);
    });
  }

  toggleBalanceVisibility(): void {
    this.showBalance = !this.showBalance;
  }

  createSubAccount(accountType: string) {
    this.subAccountCreated.emit(accountType);
  }
}

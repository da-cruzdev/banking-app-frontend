import {
  Component,
  Input,
  OnChanges,
  OnInit,
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
  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.accountData$);
  }
  ngOnInit(): void {}

  toggleBalanceVisibility(): void {
    this.showBalance = !this.showBalance;
  }
}

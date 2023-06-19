import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  showBalance: boolean = false;
  constructor() {}

  ngOnInit(): void {}

  public toggleBalanceVisibility(): void {
    this.showBalance = !this.showBalance;
  }
}

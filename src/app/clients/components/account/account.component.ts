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

  toggleBalanceVisibility(): void {
    this.showBalance = !this.showBalance;
  }
}

import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { SubaccountCreatorComponent } from '../subaccount-creator/subaccount-creator.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  showBalance: boolean = false;
  constructor(private readonly dialog: MatDialog) {}

  ngOnInit(): void {}

  toggleBalanceVisibility(): void {
    this.showBalance = !this.showBalance;
  }

  openDialog(): void {
    this.dialog.open(SubaccountCreatorComponent, {
      height: '80px',
      width: '180px',
      position: {
        left: '450px',
        top: '455px',
      },
    });
  }
}

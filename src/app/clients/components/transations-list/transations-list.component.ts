import { Component } from '@angular/core';

@Component({
  selector: 'app-transations-list',
  templateUrl: './transations-list.component.html',
  styleUrls: ['./transations-list.component.scss'],
})
export class TransationsListComponent {
  displayedColumns: string[] = [
    'account',
    'transactionType',
    'amount',
    'accountReceiver',
    'createdAt',
    'status',
  ];
  dataSource = [];
}

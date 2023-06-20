import { Component } from '@angular/core';

@Component({
  selector: 'app-transations-table',
  templateUrl: './transations-list.component.html',
  styleUrls: ['./transations-list.component.scss'],
})
export class TransationsTableComponent {
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

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'Status',
})
export class TransactionStatusPipe implements PipeTransform {
  transform(value: string | undefined): string {
    if (!value) return '';

    let statusText = '';
    let statusClass = '';

    switch (value) {
      case 'in process':
        statusText = 'En cours de traitement';
        statusClass = 'status-in-process';
        break;
      case 'approved':
        statusText = 'Accepté';
        statusClass = 'status-approved';
        break;
      case 'rejected':
        statusText = 'Rejeté';
        statusClass = 'status-rejected';
        break;
      default:
        statusText = value;
        statusClass = '';
        break;
    }

    return `<span class="${statusClass}">${statusText}</span>`;
  }
}

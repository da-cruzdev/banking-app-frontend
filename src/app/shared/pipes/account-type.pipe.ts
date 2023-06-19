import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'accountType',
})
export class AccountTypePipe implements PipeTransform {
  transform(value: string | undefined): string {
    if (!value) return '';
    switch (value) {
      case 'current':
        return 'Compte Courant';
      case 'savings':
        return 'Compte Épargne';
      case 'blocked':
        return 'Compte Bloqué';
      default:
        return value;
    }
  }
}

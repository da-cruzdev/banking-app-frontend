import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ValidatorFn,
  AbstractControl,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { AccountsDataResponse } from 'src/app/shared/interfaces/accounts.interfaces';
import { createTransaction } from '../store/client.actions';
import { selectMainAccount, selectSubAccounts } from '../store/client.reducer';

@Component({
  selector: 'app-transaction-debit',
  templateUrl: './transaction-debit.component.html',
  styleUrls: ['./transaction-debit.component.scss'],
})
export class TransactionDebitComponent implements OnInit {
  showBalance: boolean = true;
  mainAccount: AccountsDataResponse | null = null;
  subAccounts: AccountsDataResponse[] | null = null;
  accounts: AccountsDataResponse[] = [];
  selectedAccount: AccountsDataResponse | null = null;
  transactionForm!: FormGroup;

  constructor(
    private readonly store: Store,
    private readonly fb: FormBuilder
  ) {}

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

    this.transactionForm = this.fb.group({
      accountNumber: ['', Validators.required],
      amount: ['', [this.amountRangeValidator(500, 100000)]],
      reason: ['', Validators.required],
    });
  }

  updateSelectedAccount(account: AccountsDataResponse) {
    this.selectedAccount = account;
  }

  toggleBalanceVisibility(): void {
    this.showBalance = !this.showBalance;
  }

  onSubmit() {
    const formData = this.transactionForm.value;
    const accountIbanEmitter = this.selectedAccount?.iban;
    const data = {
      accountIbanEmitter,
      accountIbanReceiver: formData.accountNumber,
      amount: formData.amount,
      reason: formData.reason,
      transactionType: 'debit',
    };
    this.store.dispatch(createTransaction({ payload: data }));
    this.transactionForm.reset();
  }

  amountRangeValidator(min: number, max: number): ValidatorFn {
    return (c: AbstractControl): { [key: string]: boolean } | null => {
      if ((!!c.value && isNaN(c.value)) || c.value < min || c.value > max) {
        return { amountError: true };
      }

      return null;
    };
  }

  hasControlError(controlName: string, errorName: string): boolean {
    const control = this.transactionForm.get(controlName);
    return control?.errors?.[errorName];
  }
}

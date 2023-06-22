import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-failed',
  templateUrl: './dialog-failed.component.html',
  styleUrls: ['./dialog-failed.component.scss'],
})
export class DialogFailedComponent {
  constructor(private dialogRef: MatDialogRef<DialogFailedComponent>) {}

  ngOnInit(): void {}

  closeDialog() {
    this.dialogRef.close();
  }
}

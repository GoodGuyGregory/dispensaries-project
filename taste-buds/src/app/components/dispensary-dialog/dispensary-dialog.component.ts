import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Dispensary } from '../../models/Dispensary';

@Component({
  selector: 'app-dispensary-dialog',
  templateUrl: './dispensary-dialog.component.html',
  styleUrl: './dispensary-dialog.component.scss'
})
export class DispensaryDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<DispensaryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Dispensary
  ) {
    this.data = data;
  }
}

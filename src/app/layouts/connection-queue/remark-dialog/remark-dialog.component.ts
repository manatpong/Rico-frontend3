import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-remark-dialog',
  templateUrl: './remark-dialog.component.html',
  styleUrls: ['./remark-dialog.component.scss']
})
export class RemarkDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<RemarkDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  remark_message: string;

  onCancel() {

    this.dialogRef.close();

  }

}

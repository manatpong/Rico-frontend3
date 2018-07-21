import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'app-clear-queue',
    template: `
        <div mat-dialog-content>
        <p>Are you sure want to delete all port queue data?</p>
        </div>
        <div class="button-container" mat-dialog-actions>
        <button mat-raised-button mat-dialog-close="confirm"> Confirm</button>
        <button mat-raised-button mat-dialog-close="cancel">Cancel</button>
        </div>
    `,
    styles: [`
                .button-container {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 100 %;
                    height: auto;
                }
                button {
                    background: #3f51b5;
                    color: #fff;
                    border-radius: 20px;
                }
            `],
})
export class DebuggingClearQueueComponent {

    constructor(
        public dialogRef: MatDialogRef<DebuggingClearQueueComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) { }

}

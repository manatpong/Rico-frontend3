import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

// Third-party
import * as _ from 'lodash';

@Component({
    selector: 'app-clear-queue',
    template: `
        <div mat-dialog-content>
        <p class="text-center">Pick up hour and minute</p>
        </div>
        <div class="input-container">

            <mat-form-field>
            <mat-label>Hours</mat-label>
            <mat-select #selectHour value="">
                <mat-option *ngFor="let hour of this.hours_range" value="{{ hour }}">
                    {{ hour }}
                </mat-option>
            </mat-select>
            </mat-form-field>

            <mat-form-field>
            <mat-label>Minutes</mat-label>
            <mat-select #selectMinute value="">
                <mat-option *ngFor="let min of this.minutes_range" value="{{ min }}">
                    {{ min }}
                </mat-option>
            </mat-select>
            </mat-form-field>

        </div>
        <div class="button-container" mat-dialog-actions>
        <button mat-raised-button mat-dialog-close="{{selectHour.value}}, {{selectMinute.value}}">Confirm</button>
        <button mat-raised-button mat-dialog-close="cancel">Cancel</button>
        </div>
    `,
    styles: [`
                .text-center {
                    text-align: center;
                }
                .input-container {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 100%;
                    height: auto;
                }
                .button-container {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 100%;
                    height: auto;
                }
                button {
                    background: #3f51b5;
                    color: #fff;
                    border-radius: 20px;
                }
            `],
})
export class DebuggingSystemRestartComponent {

    hours_range = _.range(0, 24);
    minutes_range = _.range(0, 60);
    selected_hours: number;
    selected_minutes: number;

    constructor(
        public dialogRef: MatDialogRef<DebuggingSystemRestartComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) { }

    // test() {

    //     console.log(this.selected_hours, this.selected_minutes);

    // }

}

import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-warning',
    standalone: true,
    imports: [CommonModule,
        MatButtonModule],
    templateUrl: './warning.component.html',
    styleUrls: ['./warning.component.scss']
})
export class WarningComponent {

    constructor(
        private dialogRef: MatDialogRef<WarningComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) { }

    onOk() {
        this.dialogRef.close(true);
    }
    onCancel() {
        this.dialogRef.close(false);
    }

}

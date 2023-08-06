import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-new-password-request',
    standalone: true,
    imports: [CommonModule, MatButtonModule],
    templateUrl: './new-password-request.component.html',
    styleUrls: ['./new-password-request.component.scss']
})
export class NewPasswordRequestComponent {

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private dialogRef: MatDialogRef<NewPasswordRequestComponent>
    ) { }

    onConfirm() {
        this.dialogRef.close(true);
    }
    onCancel() {
        this.dialogRef.close(false);
    }
}

import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-login-error',
    standalone: true,
    imports: [CommonModule, MatDialogModule, MatButtonModule],
    templateUrl: './login-error.component.html',
    styleUrls: ['./login-error.component.scss']
})
export class LoginErrorComponent {

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private dialogRef: MatDialogRef<LoginErrorComponent>
    ) { }

    onOk() {
        this.dialogRef.close()
    }
}

import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
    selector: 'app-display-name',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule
    ],
    templateUrl: './display-name.component.html',
    styleUrls: ['./display-name.component.scss']
})
export class DisplayNameComponent implements OnInit {

    displayNameForm: FormGroup

    constructor(
        @Inject(MAT_DIALOG_DATA) private data: any,
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<DisplayNameComponent>
    ) { }

    ngOnInit(): void {
        this.initDisplayNameForm()
        console.log(this.data.displayName)
        if (this.data.displayName) {
            this.displayNameForm.patchValue({
                displayName: this.data.displayName
            })
        }
    }
    initDisplayNameForm() {
        this.displayNameForm = this.fb.group({
            displayName: new FormControl(null, [Validators.required])
        })
    }
    onConfirm() {
        const newDisplayName = this.displayNameForm.value.displayName;
        this.dialogRef.close(newDisplayName)
    }
    onCancel() {
        this.dialogRef.close();
    }
}

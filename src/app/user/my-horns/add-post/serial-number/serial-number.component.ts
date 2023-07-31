import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import * as ADD_HORN from '../store/add-post.actions';
import * as fromRoot from './../../../../app.reducer';
import { Store } from '@ngrx/store';
import { HornService } from '../../horn.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-serial-number',
    standalone: true,
    imports: [
        CommonModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        MatButtonModule
    ],
    templateUrl: './serial-number.component.html',
    styleUrls: ['./serial-number.component.scss']
})
export class SerialNumberComponent implements OnInit {
    serialNumberForm: FormGroup;



    constructor(
        private fb: FormBuilder,
        private store: Store<fromRoot.State>,
        private hornService: HornService,
        private dialogRef: MatDialogRef<SerialNumberComponent>
    ) { }

    ngOnInit(): void {
        this.initSerialNumberForm()
    }
    initSerialNumberForm() {
        this.serialNumberForm = this.fb.group({
            serialNumber: new FormControl('123456', [Validators.required])
        })
    }
    onConfirmSerialNumber() {
        const serialNumber = this.serialNumberForm.value.serialNumber;
        this.store.dispatch(new ADD_HORN.SetSerialNumber(serialNumber));
        this.dialogRef.close();
    }
}

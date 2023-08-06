import { Component, ViewChild, Input, ElementRef, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { Store } from '@ngrx/store';
import * as fromRoot from './../../../../app.reducer';

import * as ADD_POST from './../store/add-post.actions'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
// import { PostsService } from '../../posts/posts.service';

@Component({
    selector: 'app-date-of-purchase',
    standalone: true,
    imports: [
        CommonModule,
        MatFormFieldModule,
        MatButtonModule,
        MatNativeDateModule,
        MatInputModule,
        MatDatepickerModule,
        ReactiveFormsModule],
    templateUrl: './date-of-purchase.component.html',
    styleUrls: ['./date-of-purchase.component.scss']
})
export class DateOfPurchaseComponent implements OnInit {

    @ViewChild('matInputRef') private matInputRef: ElementRef

    form: FormGroup

    @ViewChild('fromInput', {
        read: MatInput
    }) fromInput: MatInput;

    editmode: boolean = false

    constructor(
        private fb: FormBuilder,
        private store: Store<fromRoot.State>,
        private dialogRef: MatDialogRef<DateOfPurchaseComponent>,
        @Inject(MAT_DIALOG_DATA) private data: any,

    ) { }

    ngOnInit(): void {
        this.initForm()
        console.log(this.data, this.matInputRef)
        if (this.data && this.data.dateOfPurchase) {
            console.log(this.data.dateOfPurchase)
            const timestampMilliseconds = this.data.dateOfPurchase.seconds * 1000;
            const date = new Date(timestampMilliseconds)
            console.log(date)
            this.editmode = true;
            this.form.patchValue({
                dateOfPurchase: date
            })
        }
    }
    initForm() {
        this.form = this.fb.group({
            dateOfPurchase: new FormControl('', [Validators.required])
        })
    }

    onDateChanged(selectedDate: Date) {
        //console.log(selectedDate)
        if (!this.editmode) {
            this.store.dispatch(new ADD_POST.SetDateOfPurchase(selectedDate))
            this.dialogRef.close();
        } else {
            // this.postsService.updatePostDateOfPurchase(this.post)
        }
    }


    clear() {
        this.matInputRef.nativeElement.value = '';
    }
    onCancel() {
        this.dialogRef.close();
    }
}

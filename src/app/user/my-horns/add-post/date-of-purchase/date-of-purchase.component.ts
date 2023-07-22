import { Component, ViewChild, Input, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { Store } from '@ngrx/store';
import * as fromRoot from './../../../../app.reducer';

import * as ADD_HORN from './../store/add-post.actions'

@Component({
    selector: 'app-date-of-purchase',
    standalone: true,
    imports: [
        CommonModule,
        MatFormFieldModule,
        MatButtonModule,
        MatNativeDateModule,
        MatInputModule,
        MatDatepickerModule,],
    templateUrl: './date-of-purchase.component.html',
    styleUrls: ['./date-of-purchase.component.scss']
})
export class DateOfPurchaseComponent {

    @ViewChild('matInputRef') matInputRef: ElementRef

    @ViewChild('fromInput', {
        read: MatInput
    }) fromInput: MatInput;

    // @ViewChild('toInput', {
    //     read: MatInput
    // })

    constructor(
        private store: Store<fromRoot.State>
    ) { }

    onDateChanged(selectedDate: Date) {
        console.log(selectedDate)
        this.store.dispatch(new ADD_HORN.SetDateOfPurchase(selectedDate))
    }

    clear() {
        console.log('clearing date')
        console.log(this.matInputRef)
        this.matInputRef.nativeElement.value = '';
        // this.matInputRef.value

    }
}

import { Component, Inject, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Brand } from 'src/app/shared/models/brand.model';
import { BrandDetailsService } from './brand-details.service';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { Observable, map } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromRoot from './../../../app.reducer'
import { SaxType } from 'src/app/shared/models/saxType.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
    selector: 'app-brand-details',
    standalone: true,
    imports: [
        CommonModule,
        MatSelectModule,
        MatButtonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSnackBarModule
    ],
    templateUrl: './brand-details.component.html',
    styleUrls: ['./brand-details.component.scss']
})
export class BrandDetailsComponent implements OnInit {

    addTypeForm: FormGroup;
    brandNameForm: FormGroup;
    saxTypesForm: FormGroup
    saxTypes: SaxType[] = []
    // brand: Brand;
    saxTypesInUse$: Observable<SaxType[]>;
    editmode: boolean = false;
    brand$: Observable<Brand>;
    @Input() brand: Brand;
    @Output() clearDetails = new EventEmitter<void>
    addingTypeVisible: boolean = false;
    addTypeFormValid: boolean = false;
    availableSaxTypes$: Observable<SaxType[]>;

    constructor(
        // @Inject(MAT_DIALOG_DATA) public data: any,
        private brandDetailService: BrandDetailsService,
        private fb: FormBuilder,
        private store: Store<fromRoot.State>,
        private snacbar: MatSnackBar
        // private dialogRef: MatDialogRef<BrandDetailsComponent>

    ) { }

    ngOnInit(): void {
        // //console.log('brand details init')
        this.saxTypes = this.brandDetailService.getSaxTypes();
        this.saxTypesInUse$ = this.store.select(fromRoot.getSaxTypes)
        this.availableSaxTypes$ = this.store.select(fromRoot.getAvailableSaxTypes)
        this.store.select(fromRoot.getSaxTypes).pipe(map(
            e => {
                // console.log(e)
            }
        ))
    }
    onAddType() {
        this.addingTypeVisible = true;
        this.initAddTypeForm()
    }
    initAddTypeForm() {
        this.addTypeForm = this.fb.group({
            type: new FormControl(null, [Validators.required])
        })
    }

    selectionChange(e) {
        //console.log(e.value);
        if (e.value !== '') {
            this.addTypeFormValid = true
        }
    }

    onConfirmSelection() {
        const type = this.addTypeForm.value.type
        this.brandDetailService.addType(this.brand.id, type)
            .then((res: any) => {
                this.snacbar.open('Type added', 'OK');
            })
            .catch((err: any) => {
                this.snacbar.open(`Adding type failed; ${err}`)
            });
        this.addTypeForm.reset();
        this.addTypeFormValid = false;
    }

    onCancelAddingType() {
        this.addingTypeVisible = false;
    }
    onClear() {
        this.clearDetails.emit()
    }
    onDeleteTypeInUse(typeId: string) {
        this.brandDetailService.deleteTypeInUse(this.brand.id, typeId)
            .then((res: any) => {
                this.snacbar.open('Type deleted', 'OK')
            })
            .catch((err: any) => {
                this.snacbar.open(`Deleting type failed; ${err}`)
            })
    }
    // initForms() {
    //     this.brandNameForm = this.fb.group({
    //         name: new FormControl(null, [Validators.required])
    //     })
    //     this.saxTypesForm = this.fb.group({
    //         saxType: new FormControl(null, [Validators.required])
    //     })
    // }

    // onAddType() {
    //     const saxType = this.saxTypesForm.value.saxType
    //     //console.log(this.saxTypesForm.value)
    //     this.brandDetailService.addType(this.brand.id, saxType).then((res) => {
    //         //console.log(res)
    //     }).catch(err => //console.log(err));
    // }
    // onClose() {
    //     this.dialogRef.close()
    // }
    // onAddBrandName() {

    // }
}

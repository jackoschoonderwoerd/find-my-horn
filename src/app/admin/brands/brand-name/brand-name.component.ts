import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AdminService } from '../../admin.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Saxophone } from 'src/app/shared/models/saxophone.model';
import { Brand } from 'src/app/shared/models/brand.model';

@Component({
    selector: 'app-brand-name',
    standalone: true,
    imports: [CommonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatSnackBarModule],
    templateUrl: './brand-name.component.html',
    styleUrls: ['./brand-name.component.scss']
})


export class BrandNameComponent implements OnInit {

    brandNameForm: FormGroup;
    @Output() hideAddBrand = new EventEmitter<void>

    constructor(
        private fb: FormBuilder,
        private adminService: AdminService,
        private snackbar: MatSnackBar,
        private firestore: Firestore) { }

    ngOnInit(): void {
        this.initBrandNameForm()
    }
    initBrandNameForm() {
        this.brandNameForm = this.fb.group({
            name: new FormControl('yamaha', [Validators.required])
        })
    }
    onConfirmBrandName() {
        const brandName = this.brandNameForm.value;
        this.adminService.addBrand(brandName)
            .then((res: any) => {
                console.log(res)
                this.snackbar.open('brand name added', ' OK')
                this.brandNameForm.reset();
            })
            .catch((err: any) => {
                this.snackbar.open(`adding brand name failed; ${err}`, 'OK')
            });
    }
    onCancel() {
        this.hideAddBrand.emit()
    }
}

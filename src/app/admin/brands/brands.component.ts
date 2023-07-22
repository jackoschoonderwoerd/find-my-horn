import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable, first } from 'rxjs';
import { Brand } from 'src/app/shared/models/brand.model';
import { AdminService } from '../admin.service';
import { Store } from '@ngrx/store';
import * as fromApp from './../../app.reducer'
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { WarningComponent } from 'src/app/shared/warning/warning.component';

import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { BrandDetailsComponent } from './brand-details/brand-details.component';
import { BrandDetailsService } from './brand-details/brand-details.service';
import { BrandNameComponent } from './brand-name/brand-name.component';


@Component({
    selector: 'app-brands',
    standalone: true,
    imports:
        [CommonModule,
            ReactiveFormsModule,
            MatFormFieldModule,
            MatInputModule,
            MatButtonModule,
            MatDialogModule,
            MatSnackBarModule,
            BrandDetailsComponent,
            BrandNameComponent
        ],
    templateUrl: './brands.component.html',
    styleUrls: ['./brands.component.scss'],

})
export class BrandsComponent {
    brandForm: FormGroup;
    brands$: Observable<Brand[]>;
    editmode: boolean = false;
    selectedBrand: Brand;
    showAddBrand: boolean = false



    constructor(
        private fb: FormBuilder,
        private adminService: AdminService,
        private store: Store<fromApp.State>,
        private dialog: MatDialog,
        private brandDetailService: BrandDetailsService,
        private snackbar: MatSnackBar
    ) { }


    ngOnInit(): void {
        this.brands$ = this.store.select(fromApp.getBrands)
        this.initBrandForm()
        this.adminService.readBrandNames();
    }
    initBrandForm() {
        this.brandForm = this.fb.group({
            name: new FormControl('buffet crampon', [Validators.required])
        })
    }



    onAddBrand() {
        this.showAddBrand = true;
    }
    hideAddBrand() {
        this.showAddBrand = false;
        this.brandForm.reset()
    }


    onDelete(id: string) {
        const dialogRef = this.dialog.open(WarningComponent, {
            data: {
                message: 'are you sure?'
            }
        });
        dialogRef.afterClosed().subscribe((res: any) => {
            if (res) {
                this.adminService.deleteBrand(id)
            }
        })
        return;
    }
    onDetails(brand: Brand) {
        this.selectedBrand = brand;
        this.brandDetailService.getTypesInUse(brand.id)
        // this.dialog.open(BrandDetailsComponent, {
        //     data: {
        //         brand: brand
        //     }
        // })
    }
    clearDetails() {
        this.selectedBrand = undefined
    }
}

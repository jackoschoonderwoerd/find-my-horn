import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AdminService } from './admin.service';
import { Observable } from 'rxjs';
import { Brand } from '../shared/models/brand.model';
import * as fromApp from './../app.reducer'
import { Store } from '@ngrx/store';
import { RouterLinkWithHref, RouterOutlet } from '@angular/router';
import { BrandsComponent } from './brands/brands.component';

@Component({
    selector: 'app-admin',
    standalone: true,
    imports: [
        BrandsComponent,
        CommonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        RouterOutlet,
        RouterLinkWithHref,],
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.scss'],

})
export class AdminComponent implements OnInit {

    brandForm: FormGroup;
    brands$: Observable<Brand[]>

    constructor(
        private fb: FormBuilder,
        private adminService: AdminService,
        private store: Store<fromApp.State>
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


}

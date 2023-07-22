import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { HornService } from '../my-horns/horn.service';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { Saxophone } from 'src/app/shared/models/saxophone.model';
import { SaxophoneSearchCriterea as SSC } from 'src/app/shared/models/saxophone.model';

@Component({
    selector: 'app-search',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatSelectModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule
    ],
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
    form: FormGroup;
    brands: string[] = [];
    types: string[] = []

    constructor(
        private fb: FormBuilder,
        private hornService: HornService
    ) { }

    ngOnInit(): void {
        this.initForm();
        // this.brands = this.hornService.getBrands()
        // this.types = this.hornService.getTypes()
    }
    initForm() {
        this.form = this.fb.group({
            brand: new FormControl(null, [Validators.required]),
            type: new FormControl(null, [Validators.required]),
            serialNumber: new FormControl(null, [Validators.required])

        })
    }
    onFind() {
        const formValue = this.form.value
        const ssc: SSC = {
            brand: formValue.brand,
            type: formValue.type,
            serialNumber: formValue.serialNumber
        }
        console.log(ssc)
    }
}

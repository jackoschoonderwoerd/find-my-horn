import { Component, EventEmitter, OnInit, Output, ViewChild, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Brand } from 'src/app/shared/models/brand.model';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromRoot from './../../../../app.reducer'
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import * as ADD_HORN from './../store/add-post.actions'
import { HornService } from '../../horn.service';
import { MatOption } from '@angular/material/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';


@Component({
    selector: 'app-select-brand',
    standalone: true,
    imports: [CommonModule,
        MatSelectModule,
        MatFormFieldModule,
        MatButtonModule
    ],
    templateUrl: './select-brand.component.html',
    styleUrls: ['./select-brand.component.scss']
})
export class SelectBrandComponent implements OnInit {

    brands$: Observable<Brand[]>;

    @ViewChild('matRef') matRef: MatSelect


    constructor(
        private store: Store<fromRoot.State>,
        private hornService: HornService,
        private dialogRef: MatDialogRef<SelectBrandComponent>
    ) { }

    ngOnInit(): void {
        this.brands$ = this.store.select(fromRoot.getBrands)
    }

    brandSelected(e) {
        //console.log(e.value)
        if (e.value != undefined) {
            const brand: Brand = e.value
            if (e) {
                this.store.dispatch(new ADD_HORN.SetBrand(brand));
                this.hornService.getTypes(brand.id)
                this.store.dispatch(new ADD_HORN.SetSelectedSaxType(null))
                this.dialogRef.close();
            }
        }
    }
    clear() {
        this.matRef.options.forEach((data: MatOption) => data.deselect());
    }
}

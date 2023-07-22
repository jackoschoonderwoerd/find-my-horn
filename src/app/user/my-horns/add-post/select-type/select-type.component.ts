import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { SaxType } from 'src/app/shared/models/saxType.model';
import { Store } from '@ngrx/store';
import * as fromRoot from './../../../../app.reducer'
import { MatSelect, MatSelectModule } from '@angular/material/select';
// import * as ADD_HORN from './../store/add-post.actions'
import * as ADD_HORN from '../store/add-post.actions'

import { MatOption } from '@angular/material/core';

@Component({
    selector: 'app-select-type',
    standalone: true,
    imports: [CommonModule,
        MatSelectModule],
    templateUrl: './select-type.component.html',
    styleUrls: ['./select-type.component.scss']
})
export class SelectTypeComponent implements OnInit {


    saxTypes$: Observable<SaxType[]>
    @ViewChild('matRef') matRef: MatSelect

    constructor(
        private store: Store<fromRoot.State>
    ) { }

    ngOnInit(): void {
        this.saxTypes$ = this.store.select(fromRoot.getAvailableSaxTypes)
    }
    typeSelected(e) {
        if (e.value !== undefined) {
            const selectedSaxType: SaxType = e.value
            this.store.dispatch(new ADD_HORN.SetSelectedSaxType(selectedSaxType))
        }
    }
    clear() {
        this.matRef.options.forEach((data: MatOption) => data.deselect());
    }
}

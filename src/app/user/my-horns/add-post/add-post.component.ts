import { Component, Output, EventEmitter, OnInit, ViewChild, Input } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HornService } from '../horn.service';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Saxophone } from 'src/app/shared/models/saxophone.model';
import { Store } from '@ngrx/store';
import * as fromRoot from './../../../app.reducer'
import { User as FirebaseUser } from "@angular/fire/auth";
import { Auth } from '@angular/fire/auth';
import { SaxophoneSearchCriterea as SSC } from 'src/app/shared/models/saxophone.model';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { Post } from 'src/app/shared/models/post.model';
import { SelectBrandComponent } from './select-brand/select-brand.component';
import { Brand } from 'src/app/shared/models/brand.model';
import * as ADD_HORN from './../add-post/store/add-post.actions'
import { Observable } from 'rxjs';
import { SelectTypeComponent } from './select-type/select-type.component';
import { SaxType } from 'src/app/shared/models/saxType.model';
import { SerialNumberComponent } from './serial-number/serial-number.component';
import { DateOfPurchaseComponent } from './date-of-purchase/date-of-purchase.component';
import { CommentComponent } from './comment/comment.component';
import { PostsService } from '../posts/posts.service';




@Component({
    selector: 'app-add-post',
    standalone: true,
    imports: [
        CommonModule,
        MatButtonModule,
        ReactiveFormsModule,
        FormsModule,
        MatSelectModule,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        SelectBrandComponent,
        SelectTypeComponent,
        SerialNumberComponent,
        DateOfPurchaseComponent,
        DatePipe,
        CommentComponent
    ],
    templateUrl: './add-post.component.html',
    styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent implements OnInit {


    form: FormGroup
    brands: string[] = [];
    types: string[] = []
    editmode: boolean = false;
    selectedBrand: Brand;
    selectedBrand$: Observable<Brand>;
    selectedSaxType$: Observable<SaxType>;
    serialNumber$: Observable<string>;
    dateOfPurchase$: Observable<Date>;
    comment$: Observable<string>
    @ViewChild('appSelectBrand', { static: false }) appSelectBrandComponent: SelectBrandComponent;
    @ViewChild('appSelectType', { static: false }) appSelectTypeComponent: SelectTypeComponent;
    @ViewChild('appDateOfPurchase', { static: false }) appDateOfPurchaseComponent: DateOfPurchaseComponent;





    constructor(
        private fb: FormBuilder,
        private hornService: HornService,
        private store: Store<fromRoot.State>,
        private afAuth: Auth,
        private postsService: PostsService
    ) { }

    ngOnInit(): void {
        // this.store.subscribe((storedata: any) => console.log(storedata));
        // this.hornService.readSaxCollection();
        this.selectedBrand$ = this.store.select(fromRoot.getSelectedBrand);
        this.selectedSaxType$ = this.store.select(fromRoot.getSelectedSaxType);
        this.serialNumber$ = this.store.select(fromRoot.getSerialNumber);
        this.dateOfPurchase$ = this.store.select(fromRoot.getDateOfPurchase);
        this.comment$ = this.store.select(fromRoot.getComment);
        this.store.select(fromRoot.getSelectedBrand).subscribe((selectedBrand: Brand) => {
            if (selectedBrand) {
                console.log(selectedBrand)
                this.hornService.getTypes(selectedBrand.id)
            }
        })
    }

    onClearAll() {
        console.log('onClearAll()')
        // this.store.dispatch(new ADD_HORN.ClearAll)
        this.appSelectBrandComponent.clear()
        this.appSelectTypeComponent.clear()
        this.appDateOfPurchaseComponent.clear()

    }


    onAddPost() {
        this.postsService.addPost()
    }



}

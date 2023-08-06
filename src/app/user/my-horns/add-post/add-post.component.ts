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
import * as ADD_POST from './../add-post/store/add-post.actions'
import { Observable } from 'rxjs';
import { SelectTypeComponent } from './select-type/select-type.component';
import { SaxType } from 'src/app/shared/models/saxType.model';
import { SerialNumberComponent } from './serial-number/serial-number.component';
import { DateOfPurchaseComponent } from './date-of-purchase/date-of-purchase.component';
import { CommentComponent } from './comment/comment.component';
// import { PostsService } from '../posts/posts.service';
import { AddHornState } from './store/add-post.reducer';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { BrandNameComponent } from 'src/app/admin/brands/brand-name/brand-name.component';
import { PostsService } from 'src/app/saxophones/posts.service';





@Component({
    selector: 'app-add-post',
    standalone: true,
    imports: [
        CommentComponent,
        CommonModule,
        DateOfPurchaseComponent,
        DatePipe,
        FormsModule,
        MatButtonModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatInputModule,
        MatNativeDateModule,
        MatSelectModule,
        ReactiveFormsModule,
        SelectBrandComponent,
        SelectTypeComponent,
        SerialNumberComponent,
        MatDialogModule,
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
    comment$: Observable<string>;
    addHornState$: Observable<AddHornState>;
    postInComplete: boolean = true;
    post: Post;

    brand: Brand;
    saxType: SaxType;
    serialNumber: string;
    dateOfPurchase: Date;
    comment: string;

    addPostToRegisterdSaxophone$: Observable<boolean>


    @ViewChild('appSelectBrand', { static: false }) appSelectBrandComponent: SelectBrandComponent;
    @ViewChild('appSelectType', { static: false }) appSelectTypeComponent: SelectTypeComponent;
    @ViewChild('appDateOfPurchase', { static: false }) appDateOfPurchaseComponent: DateOfPurchaseComponent;





    constructor(
        private fb: FormBuilder,
        private hornService: HornService,
        private store: Store<fromRoot.State>,
        private afAuth: Auth,
        private postsService: PostsService,
        private dialog: MatDialog
    ) { }

    ngOnInit(): void {
        this.addPostToRegisterdSaxophone$ = this.store.select(fromRoot.getAddPostToRegisteredSaxophone);
        this.store.select(fromRoot.getSelectedBrand).subscribe((selectedBrand: Brand) => {
            if (selectedBrand) {
                //console.log(selectedBrand)
                this.hornService.getTypes(selectedBrand.id)
            }
        })
        this.store.select(fromRoot.getAddHornState).subscribe((addHornState: AddHornState) => {
            //console.log(addHornState)
            this.brand = addHornState.brand;
            this.saxType = addHornState.saxType;
            this.serialNumber = addHornState.serialNumber;
            this.dateOfPurchase = addHornState.dateOfPurchase;
            this.comment = addHornState.comment;

            if (this.brand && this.saxType && this.serialNumber) {
                this.postInComplete = false;
            } else {
                this.postInComplete = true;
            }

            // if (this.brand && this.saxType && this.serialNumber && this.dateOfPurchase && this.comment) {
            if (this.brand && this.saxType && this.serialNumber) {
                const saxophone: Saxophone = {
                    brand: this.brand,
                    saxType: this.saxType,
                    serialNumber: this.serialNumber
                }
                this.post = {
                    datePosted: new Date(),
                    saxophone: saxophone,
                    ownerId: this.afAuth.currentUser.uid,
                    dateOfPurchase: this.dateOfPurchase,
                    comment: this.comment
                }
                //console.log(`post complete ${this.post}`)

            }
        })

        this.store.select(fromRoot.getAddHornState).subscribe((addHornState: AddHornState) => {
            //console.log(addHornState)
        })
        this.addHornState$ = this.store.select(fromRoot.getAddHornState);
    }
    onSelectBrand() {
        this.dialog.open(SelectBrandComponent)
    }
    onSelectSaxType() {
        this.dialog.open(SelectTypeComponent)
    }
    onAddSerialNumber() {
        this.dialog.open(SerialNumberComponent)
    }
    onAddDateOfPurchase() {
        this.dialog.open(DateOfPurchaseComponent)
    }
    onAddComment() {
        this.dialog.open(CommentComponent)
    }

    onClearForm() {
        //console.log('onClearAll()')
        // this.store.dispatch(new ADD_POST.ClearAll)
        // this.appSelectBrandComponent.clear()
        // this.appSelectTypeComponent.clear()
        // this.appDateOfPurchaseComponent.clear()

    }
    onClearPostFromStore() {
        this.store.dispatch(new ADD_POST.ClearAll())
    }

    onAddPost() {
        this.postsService.addPost(this.post)
            .then((res: any) => {
                this.onClearForm();
                this.onClearPostFromStore();
                this.store.dispatch(new ADD_POST.ShowAddSaxophone(false))
            })
    }
}

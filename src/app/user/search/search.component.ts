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
import { Brand } from 'src/app/shared/models/brand.model';
import { SaxType } from 'src/app/shared/models/saxType.model';
import { Observable } from 'rxjs';
import * as fromRoot from './../../app.reducer'
import { Store } from '@ngrx/store';
import { PostsService } from '../../saxophones/posts.service';
import { Post } from 'src/app/shared/models/post.model';
import { FoundPostsComponent } from './found-posts/found-posts.component';

@Component({
    selector: 'app-search',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatSelectModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        FoundPostsComponent
    ],
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
    form: FormGroup;
    brands: Brand[] = [];
    saxTypes: SaxType[] = [];
    saxTypes$: Observable<SaxType[]>;
    brands$: Observable<Brand[]>

    constructor(
        private fb: FormBuilder,
        private hornService: HornService,
        private store: Store<fromRoot.State>,
        private postsService: PostsService
    ) { }

    ngOnInit(): void {
        this.initForm();
        this.saxTypes$ = this.store.select(fromRoot.getAvailableSaxTypes);
        this.brands$ = this.store.select(fromRoot.getBrands);

    }
    initForm() {
        this.form = this.fb.group({
            brand: new FormControl(null, [Validators.required]),
            type: new FormControl(null, [Validators.required]),
            serialNumber: new FormControl('1234568', [Validators.required])

        })
    }

    brandSelected(e: any) {
        //console.log(e)
        const brand = e.value
        if (brand != undefined) {
            this.hornService.getTypes(brand.id)
        }
    }

    onFind() {
        const formValue = this.form.value
        const ssc: SSC = {
            brand: formValue.brand,
            saxType: formValue.type,
            serialNumber: formValue.serialNumber
        }
        console.log(ssc)
        this.postsService.findPostsBySsc(ssc)

        // .subscribe((posts: Post[]) => {
        //     if (posts.length) {
        //         //console.log(posts)
        //         this.clearForm()
        //     } else {
        //         //console.log('no posts for this saxophone found')
        //     }
        // });
    }
    clearForm() {
        this.form.reset()
    }
}

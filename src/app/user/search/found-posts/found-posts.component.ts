import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as fromRoot from './../../../app.reducer'
import { Store } from '@ngrx/store';
import { Post } from 'src/app/shared/models/post.model';
import { Observable } from 'rxjs';
import { FoundPostComponent } from './found-post/found-post.component';

@Component({
    selector: 'app-found-posts',
    standalone: true,
    imports: [CommonModule, FoundPostComponent],
    templateUrl: './found-posts.component.html',
    styleUrls: ['./found-posts.component.scss']
})
export class FoundPostsComponent implements OnInit {

    foundPosts$: Observable<Post[]>

    constructor(
        private store: Store<fromRoot.State>
    ) { }
    ngOnInit(): void {
        this.foundPosts$ = this.store.select(fromRoot.getFoundPosts)
    }
}

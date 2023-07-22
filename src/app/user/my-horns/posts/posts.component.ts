import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import * as fromRoot from './../../../app.reducer'
import { Store } from '@ngrx/store';
import { Observable, first, map, take } from 'rxjs';
import { Post } from 'src/app/shared/models/post.model';
import { PostsService } from './posts.service';
import { Firestore, deleteDoc, doc } from '@angular/fire/firestore';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { PostsBySerialComponent } from './posts-by-serial/posts-by-serial.component';

@Component({
    selector: 'app-posts',
    standalone: true,
    imports: [
        CommonModule,
        DatePipe,
        MatButtonModule,
        MatIconModule,
        PostsBySerialComponent
    ],
    templateUrl: './posts.component.html',
    styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

    posts$: Observable<Post[]>
    posts: any
    arraysOfPosts: any
    arraysOfPosts$: Observable<Post[]>

    constructor(
        private store: Store<fromRoot.State>,
        private postsService: PostsService,
        private firestore: Firestore
    ) { }

    ngOnInit(): void {

        this.arraysOfPosts$ = this.store.select(fromRoot.getPosts)

        this.store.select(fromRoot.getPosts).subscribe((posts) => {
            // this.store.select(fromRoot.getPosts).pipe(first()).subscribe((posts) => {
            // console.log(posts)
            // this.arraysOfPosts = Object.values(posts)
            this.arraysOfPosts = posts;
        })
        this.store.subscribe(storeData => console.log(storeData))
    }
    onDeletePost(post: Post) {
        this.postsService.deletePost(post)
    }
}

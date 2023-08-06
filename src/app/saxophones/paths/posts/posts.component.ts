import { Component, Input, OnInit, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Post } from 'src/app/shared/models/post.model';
// import { PostsService } from 'src/app/user/my-horns/posts/posts.service';
import { Observable } from 'rxjs';

import { Auth } from '@angular/fire/auth';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { Store } from '@ngrx/store';
import * as fromRoot from '../../../app.reducer'
import { WarningComponent } from 'src/app/shared/warning/warning.component';
import { MatExpansionModule } from '@angular/material/expansion';
// import { PostComponent } from './post/post.component';
import { PostsService } from '../../posts.service';
import { PostComponent } from './post/post.component';

@Component({
    selector: 'app-posts',
    standalone: true,
    imports: [
        CommonModule,
        MatButtonModule,
        MatIconModule,
        MatDialogModule,
        MatExpansionModule,
        PostComponent
    ],
    templateUrl: './posts.component.html',
    styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
    @Input() path: string;
    posts$: Observable<any>
    posts: Post[];
    emptyTemplate = new EventEmitter<void>

    constructor(
        private postsService: PostsService,
        public afAuth: Auth,
        private dialog: MatDialog,
        public store: Store<fromRoot.State>
    ) { }

    ngOnInit(): void {
        this.posts$ = this.postsService.getPostsByPath(this.path);
    }
}

import { Component, Input, OnInit, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { connectFirestoreEmulator } from '@angular/fire/firestore';
import { Post } from 'src/app/shared/models/post.model';
import { PostsService } from 'src/app/user/my-horns/posts/posts.service';
import { Observable } from 'rxjs';
import { HornService } from '../../user/my-horns/horn.service';
import { Auth } from '@angular/fire/auth';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CommentComponent } from 'src/app/user/my-horns/add-post/comment/comment.component';
import { Store } from '@ngrx/store';
import * as fromRoot from './../../app.reducer'
import { WarningComponent } from 'src/app/shared/warning/warning.component';
import { MatSelectModule } from '@angular/material/select';
import { MatExpansionModule } from '@angular/material/expansion';
import { PostComponent } from './post/post.component';

@Component({
    selector: 'app-test-child',
    standalone: true,
    imports: [
        CommonModule,
        MatButtonModule,
        MatIconModule,
        MatDialogModule,
        MatExpansionModule,
        PostComponent
    ],
    templateUrl: './test-child.component.html',
    styleUrls: ['./test-child.component.scss']
})
export class TestChildComponent implements OnInit {
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
        // this.postsService.getPostsByPath(this.path).subscribe((posts: Post[]) => {
        //     console.log(posts.length)
        //     if (!posts.length) {
        //         this.emptyTemplate.emit()
        //     }
        // })
    }
    onEditComment(post: Post) {
        // console.log(post);
        // const dialogRef = this.dialog.open(CommentComponent, {
        //     data: {
        //         comment: post.comment
        //     }
        // })
        // dialogRef.afterClosed().subscribe((comment: string) => {
        //     if (comment) {
        //         this.postsService.updateComment(post, comment)
        //     }
        // })

    }
    onDeletePost(post: Post) {
        const dialogRef = this.dialog.open(WarningComponent, {
            data: {
                message: ' This will permanently delete the selected post'
            }
        })
        dialogRef.afterClosed().subscribe((res: any) => {
            if (res) {
                this.postsService.deletePost(post)
                    .then((res: any) => {
                        console.log('post deleted')
                    })
                    .catch(err => {
                        console.log('deleting post failed', err)
                    })
            }
            return;
        })
    }
}

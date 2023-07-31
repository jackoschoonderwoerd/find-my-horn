import { Component, Input, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Post, PostDateToAny } from 'src/app/shared/models/post.model';
import { Saxophone } from 'src/app/shared/models/saxophone.model';

import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { PostsService } from '../../posts.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { WarningComponent } from 'src/app/shared/warning/warning.component';
import { Auth } from '@angular/fire/auth';
import { DateOfPurchaseComponent } from '../../../add-post/date-of-purchase/date-of-purchase.component';
import { CommentComponent } from '../../../add-post/comment/comment.component';


// export interface PostDateToAny {
//     id?: string;
//     datePosted: any;
//     saxophone: Saxophone;
//     ownerId?: string;
//     dateOfPurchase?: any;
//     comment: string;
// }

@Component({
    selector: 'app-single-post',
    standalone: true,
    imports: [
        CommonModule,
        DatePipe,
        MatExpansionModule,
        MatButtonModule,
        MatIconModule,
        MatDialogModule
    ],
    templateUrl: './single-post.component.html',
    styleUrls: ['./single-post.component.scss']
})
export class SinglePostComponent implements OnInit {
    @Input() post: Post
    postDateToAny: PostDateToAny;
    currentUserId: string;
    ownsPost: boolean = false

    constructor(
        private postsService: PostsService,
        private dialog: MatDialog,
        private afAuth: Auth,

    ) {
    }
    ngOnInit(): void {
        this.ownsPost = this.afAuth.currentUser.uid === this.post.ownerId;
        this.postDateToAny = {
            id: this.post.id,
            datePosted: this.post.datePosted,
            saxophone: this.post.saxophone,
            ownerId: this.post.ownerId,
            dateOfPurchase: this.post.dateOfPurchase,
            comment: this.post.comment
        }
        this.currentUserId = this.afAuth.currentUser.uid;
    }
    onDeletePost() {

        const dialogRef = this.dialog.open(WarningComponent, {
            data: {
                message: 'this will permanently delete this post'
            }
        })
        dialogRef.afterClosed().subscribe((res: any) => {
            if (res) {
                this.postsService.deletePost(this.post)
                    .then(res => {
                        // console.log(res)
                    })
                    .catch(err => console.log(err));
            }
        })
    }

    onEditDateOfPurchase() {
        const dialogRef = this.dialog.open(DateOfPurchaseComponent, {
            data: {
                dateOfPurchase: this.post.dateOfPurchase
            }
        })
        dialogRef.afterClosed().subscribe((res: any) => {
            if (res) {

            }
        })
    }
    onEditComment() {
        const dialogRef = this.dialog.open(CommentComponent, {
            data: {
                comment: this.post.comment
            }
        })
        dialogRef.afterClosed().subscribe((comment: string) => {
            if (comment) {
                this.postsService.updatePostComment(this.post, comment)
                    .then((res: any) => {
                        console.log('comment updated');
                        // this.postsService.getPostsByUserId();
                    })
                    .catch(err => {
                        console.log(`failed to update comment; ${err}`)
                    });
            }
        })
    }
}

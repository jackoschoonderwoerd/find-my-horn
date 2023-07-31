import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Post } from 'src/app/shared/models/post.model';
import { MatExpansionModule } from '@angular/material/expansion';
import { Auth } from '@angular/fire/auth';
import { Saxophone } from 'src/app/shared/models/saxophone.model';
import { MatIconModule } from '@angular/material/icon';
import { PostsService } from 'src/app/user/my-horns/posts/posts.service';
import { UiService } from 'src/app/shared/ui.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { WarningComponent } from 'src/app/shared/warning/warning.component';
import { MatButtonModule } from '@angular/material/button';
import { CommentComponent } from 'src/app/user/my-horns/add-post/comment/comment.component';

export interface PostDateToAny {
    id?: string;
    datePosted: any;
    saxophone: Saxophone;
    ownerId?: string;
    dateOfPurchase?: any;
    comment: string;

}

@Component({
    selector: 'app-post',
    standalone: true,
    imports: [
        CommonModule,
        MatExpansionModule,
        MatIconModule,
        MatSnackBarModule,
        MatButtonModule
    ],
    templateUrl: './post.component.html',
    styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
    @Input() public post: Post;
    @Input() public index: number;
    postDateToAny: PostDateToAny
    ownesPost: boolean = false


    constructor(
        public afAuth: Auth,
        private postsService: PostsService,
        private snackbar: MatSnackBar,
        private dialog: MatDialog
    ) { }

    ngOnInit(): void {
        if (this.afAuth.currentUser.uid === this.post.ownerId) {
            this.ownesPost = true;
        }
        this.postDateToAny = {
            ...this.post,
            datePosted: this.post.datePosted,
            dateOfPurchase: this.post.dateOfPurchase

        }

    }
    onDeletePost(): void {
        this.showWarning('this will permanently delete the selected post')
            .then((res: any) => {
                if (res) {
                    console.log(res)
                    this.postsService.deletePost(this.post)
                        .then((res: any) => {
                            this.showSnackbar('post deleted');
                        })
                        .catch((err: any) => {
                            this.showSnackbar('failed to delete post');
                        })
                }
            })
            .catch((err: any) => {
                console.log(err)
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
                this.postsService.updateComment(this.post, comment)
                    .then((res: any) => {
                        console.log(res)
                        this.showSnackbar('comment updated')
                    })
                    .catch((err: any) => {
                        this.showSnackbar(`updating comment failed; ${err}`)
                    })

            } else {
                this.showSnackbar('updating comment cancelled')
            }
        })
    }

    private showSnackbar(message: string): void {
        this.snackbar.open(message, 'CLOSE', { duration: 5000 })
    }

    private showWarning(message: string): Promise<any> {
        const dialogRef = this.dialog.open(WarningComponent, {
            data: {
                message
            }
        })
        const promise = new Promise((res, rej) => {
            dialogRef.afterClosed().subscribe((result: any) => {
                if (result) {
                    res(true);
                } else {
                    res(false);
                }
            })

        })
        return promise;
    }
}

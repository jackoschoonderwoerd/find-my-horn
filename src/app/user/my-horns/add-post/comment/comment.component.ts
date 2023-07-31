import { Component, OnInit, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { Store } from '@ngrx/store';
import * as fromRoot from './../../../../app.reducer';
import * as ADD_HORN from './../store/add-post.actions'
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { PostsService } from '../../posts/posts.service';



@Component({
    selector: 'app-comment',
    standalone: true,
    imports: [
        CommonModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatIconModule,
        MatDialogModule
    ],
    templateUrl: './comment.component.html',
    styleUrls: ['./comment.component.scss'],
    providers: [
        // {
        //     provide: MAT_DIALOG_DATA,
        //     useValue: {},
        // },

        // { provide: MdDialogRef, useValue: {} }, --> deprecated

    ]
})
export class CommentComponent implements OnInit {

    commentForm: FormGroup;
    editmode: boolean = false;

    constructor(
        private fb: FormBuilder,
        private store: Store<fromRoot.State>,
        @Inject(MAT_DIALOG_DATA) private data: any,
        private dialogRef: MatDialogRef<CommentComponent>,
        private postsService: PostsService

    ) { }

    ngOnInit(): void {
        this.initCommentForm()
        if (this.data && this.data.comment) {
            console.log(this.data)
            this.editmode = true;
            this.commentForm.patchValue({
                comment: this.data.comment
            })
        }
    }

    initCommentForm() {
        this.commentForm = this.fb.group({
            comment: new FormControl('my comment', [Validators.required])
        })
    }
    onAddComment() {
        const comment: string = this.commentForm.value.comment;
        if (!this.editmode) {
            this.store.dispatch(new ADD_HORN.SetComment(comment));
            this.dialogRef.close(comment);
        } else {
            this.dialogRef.close(comment)
        }

    }
    onCancel() {
        this.dialogRef.close()
    }
    closeDialog() {
        this.dialogRef.close()
    }
}

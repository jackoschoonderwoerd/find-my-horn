import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { Store } from '@ngrx/store';
import * as fromRoot from './../../../../app.reducer';
import * as ADD_HORN from './../store/add-post.actions'

@Component({
    selector: 'app-comment',
    standalone: true,
    imports: [
        CommonModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        MatButtonModule
    ],
    templateUrl: './comment.component.html',
    styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

    commentForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private store: Store<fromRoot.State>
    ) { }

    ngOnInit(): void {
        this.initCommentForm()
    }

    initCommentForm() {
        this.commentForm = this.fb.group({
            comment: new FormControl('my comment', [Validators.required])
        })
    }
    onSubmit() {
        const comment: string = this.commentForm.value.comment;
        this.store.dispatch(new ADD_HORN.SetComment(comment))
    }
}

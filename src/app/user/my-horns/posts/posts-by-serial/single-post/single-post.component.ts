import { Component, Input, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Post } from 'src/app/shared/models/post.model';
import { Saxophone } from 'src/app/shared/models/saxophone.model';

import { MatExpansionModule } from '@angular/material/expansion';


export interface PostDateToAny {
    id?: string;
    datePosted: any;
    saxophone: Saxophone;
    ownerId?: string;
    dateOfPurchase?: any;
    comment: string
}

@Component({
    selector: 'app-single-post',
    standalone: true,
    imports: [CommonModule, DatePipe, MatExpansionModule],
    templateUrl: './single-post.component.html',
    styleUrls: ['./single-post.component.scss']
})
export class SinglePostComponent implements OnInit {
    @Input() post: Post
    postDateToAny: PostDateToAny

    constructor() {
    }
    ngOnInit(): void {
        this.postDateToAny = {
            id: this.post.id,
            datePosted: this.post.datePosted,
            saxophone: this.post.saxophone,
            ownerId: this.post.ownerId,
            dateOfPurchase: this.post.dateOfPurchase,
            comment: this.post.comment
        }

    }
}

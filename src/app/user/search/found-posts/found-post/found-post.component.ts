import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Post, PostDateToAny } from 'src/app/shared/models/post.model';

@Component({
    selector: 'app-found-post',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './found-post.component.html',
    styleUrls: ['./found-post.component.scss']
})


export class FoundPostComponent implements OnInit {

    foundPostDateToAny: PostDateToAny

    @Input() foundPost: Post

    ngOnInit(): void {
        this.foundPostDateToAny = {

            id: this.foundPost.id,
            datePosted: this.foundPost.datePosted,
            saxophone: this.foundPost.saxophone,
            ownerId: this.foundPost.ownerId,
            dateOfPurchase: this.foundPost.dateOfPurchase,
            comment: this.foundPost.comment

        }
    }
}

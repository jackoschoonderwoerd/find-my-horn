import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Post, PostDateToAny } from 'src/app/shared/models/post.model';
import { Auth } from '@angular/fire/auth';

@Component({
    selector: 'app-found-post',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './found-post.component.html',
    styleUrls: ['./found-post.component.scss']
})


export class FoundPostComponent implements OnInit {

    foundPostDateToAny: PostDateToAny
    ownsPost: Boolean
    @Input() foundPost: Post


    constructor(
        public afAuth: Auth
    ) { }

    ngOnInit(): void {
        this.ownsPost = this.afAuth.currentUser.uid === this.foundPost.ownerId
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

import { Component, Input, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Post } from 'src/app/shared/models/post.model';
import { SinglePostComponent } from './single-post/single-post.component';
import { MatExpansionModule } from '@angular/material/expansion';



@Component({
    selector: 'app-posts-by-serial',
    standalone: true,
    imports: [CommonModule, SinglePostComponent, DatePipe, MatExpansionModule],
    templateUrl: './posts-by-serial.component.html',
    styleUrls: ['./posts-by-serial.component.scss']
})
export class PostsBySerialComponent implements OnInit {
    @Input() posts: Post[]

    ngOnInit(): void {
        //console.log(this.posts)
    }
}

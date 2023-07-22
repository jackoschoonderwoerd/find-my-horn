import { Component, AfterContentChecked, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { AddPostComponent } from './add-post/add-post.component';
import { HornService } from './horn.service';
import { PostsComponent } from './posts/posts.component';


@Component({
    selector: 'app-my-horns',
    standalone: true,
    imports: [CommonModule, MatButtonModule, AddPostComponent, PostsComponent],
    templateUrl: './my-horns.component.html',
    styleUrls: ['./my-horns.component.scss']
})
export class MyHornsComponent implements OnInit {

    addPostVisible: boolean = true;

    constructor(private hornService: HornService) { }

    ngOnInit(): void {
        this.hornService.addPostVisibleSubject.subscribe((addPostVisible: boolean) => {
            // console.log(this.addPostVisible, addPostVisible)
            this.addPostVisible = addPostVisible
        })
    }



    onToggleAddHorn() {
        // console.log('hi')
        this.addPostVisible = !this.addPostVisible;
    }

    // hideAddHorn() {
    //     console.log('hideAddHorn')
    //     setTimeout(() => {
    //         this.addingHorn = false
    //     }, 0);
    // }
}

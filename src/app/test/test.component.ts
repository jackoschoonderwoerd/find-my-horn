import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsService } from '../user/my-horns/posts/posts.service';
import { Observable, take, takeLast, skip } from 'rxjs';
import { Post } from '../shared/models/post.model';
import { TestChildComponent } from './test-child/test-child.component';
import { Auth, getAuth, onAuthStateChanged, User as FirebaseUser, User } from '@angular/fire/auth';
import { AddPostComponent } from '../user/my-horns/add-post/add-post.component';

@Component({
    selector: 'app-test',
    standalone: true,
    imports: [CommonModule, TestChildComponent, AddPostComponent],
    templateUrl: './test.component.html',
    styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

    posts$: Observable<any>;
    post$: Observable<Post>;
    paths$: Observable<any>
    posts: any[] = []


    constructor(
        private postsService: PostsService,
        private afAuth: Auth
    ) { }

    ngOnInit(): void {
        const auth = getAuth()
        onAuthStateChanged(auth, (user: FirebaseUser) => {
            if (user) {
                const userId = this.afAuth.currentUser.uid
                this.paths$ = this.postsService.getPostsPathsByUid(userId)
            }
        })

    }
    // getPost(path: string) {
    //     console.log(path)
    //     return this.postsService.getPostsByPath(path)
    // }
}

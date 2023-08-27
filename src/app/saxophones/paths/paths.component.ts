import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Observable, take } from 'rxjs';

// import { PostsComponent } from './paths/posts/posts.component';
import { Auth, getAuth, onAuthStateChanged, User as FirebaseUser, User } from '@angular/fire/auth';
// import { AddPostComponent } from '../user/my-horns/add-post/add-post.component';
import { MatButtonModule } from '@angular/material/button';
// import { PostsService } from 'src/app/user/my-horns/posts/posts.service';
import { PostsComponent } from './posts/posts.component';
import { AddPostComponent } from 'src/app/user/my-horns/add-post/add-post.component';
import { PostsService } from '../posts.service';
import * as ADD_POST from './../../user/my-horns/add-post/store/add-post.actions'
import * as fromRoot from './../../app.reducer'
import { Store } from '@ngrx/store';

@Component({
    selector: 'app-paths',
    standalone: true,
    imports: [
        CommonModule,
        PostsComponent,
        AddPostComponent,
        MatButtonModule],
    templateUrl: './paths.component.html',
    styleUrls: ['./paths.component.scss']
})
export class PathsComponent implements OnInit {

    // posts$: Observable<any>;
    // post$: Observable<Post>;
    paths$: Observable<any>
    // posts: any[] = [];
    showAddSaxophone$: Observable<boolean>


    constructor(
        private postsService: PostsService,
        private afAuth: Auth,
        private store: Store<fromRoot.State>
    ) { }

    ngOnInit(): void {
        this.showAddSaxophone$ = this.store.select(fromRoot.getShowAddSaxophone)
        const auth = getAuth()
        onAuthStateChanged(auth, (user: FirebaseUser) => {
            if (user) {
                const userId = this.afAuth.currentUser.uid
                this.paths$ = this.postsService.getPostsPathsByUid(userId)
            }
        })

    }
    onShowAddSaxophone() {
        // console.log(this.showAddSaxophone$)
        this.showAddSaxophone$.pipe(take(1)).subscribe((res: boolean) => {
            console.log(res)
            if (!res) {
                this.store.dispatch(new ADD_POST.ShowAddSaxophone(true))
                // this.store.dispatch(new ADD_POST.AddPostToRegisteredSaxophone(true))
            } else {

                this.store.dispatch(new ADD_POST.ShowAddSaxophone(false))
            }
        })

        // this.showAddSaxophone = !this.showAddSaxophone;
    }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './navigation/header/header.component';
import { FooterComponent } from './navigation/footer/footer.component';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import * as fromRoot from './app.reducer';
// import * as AUTH from './auth/auth-store/auth.actions'
import { Store } from '@ngrx/store';
import { AdminService } from './admin/admin.service';
import { HornService } from './user/my-horns/horn.service';
import { User as FirebaseUser } from "@angular/fire/auth";
import { PostsService } from './user/my-horns/posts/posts.service';


@Component({
    selector: 'app-root',
    standalone: true,
    imports: [CommonModule, RouterOutlet, HeaderComponent, FooterComponent],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    title = 'find-my-horn';

    constructor(
        private store: Store<{ ui: fromRoot.State }>,
        private router: Router,
        private adminService: AdminService,
        private hornService: HornService,
        private postsService: PostsService
    ) { }

    ngOnInit(): void {
        const auth = getAuth()
        onAuthStateChanged(auth, (user: FirebaseUser) => {
            if (user) {
                this.postsService.getPostsByUserId()
                // this.store.dispatch(new AUTH.IsLoggedIn(user))
            } else {
                this.router.navigateByUrl('log-in')
            }
        })
        this.adminService.readBrandNames()
    }
}

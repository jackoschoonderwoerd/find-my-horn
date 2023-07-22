import { Injectable } from '@angular/core';
import { HornUser } from '../shared/models/user.model';
import {
    Auth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    setPersistence,
    browserSessionPersistence,
    user,
    signOut,
    getAuth,
    onAuthStateChanged,
    User
} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromRoot from './../app.reducer';
import * as UI from './../shared/ui.actions';
// import * as AUTH from './../auth/auth-store/auth.actions'
import { Firestore, addDoc, collection, doc, setDoc } from '@angular/fire/firestore';
import { HornService } from '../user/my-horns/horn.service';
import { PostsService } from '../user/my-horns/posts/posts.service';
import * as USER from './../user/store/user.actions'

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(
        private afAuth: Auth,
        private router: Router,
        private store: Store<{ ui: fromRoot.State }>,
        private firestore: Firestore,
        private hornService: HornService,
        private postsService: PostsService
    ) { }

    signUp(hornUser: HornUser) {
        const hornUserName = hornUser.name;
        const hornUserEmail = hornUser.email;
        const hornUserPassword = hornUser.password;
        this.store.dispatch(new UI.StartLoading());
        createUserWithEmailAndPassword(this.afAuth, hornUserEmail, hornUserPassword)
            .then((res: any) => {
                this.store.dispatch(new UI.StopLoading);
                // this.store.dispatch(new AUTH.IsLoggedIn(res))
                const userId = res.user.uid
                this.storeUserInDb(userId);
            })
            .catch((err: any) => {
                console.log(`signing up failed'; ${err}`);
                this.store.dispatch(new UI.StopLoading);
            })
    }
    logIn(hornUser: HornUser) {
        this.store.dispatch(new UI.StartLoading());
        const hornUserName = hornUser.name;
        const hornUserEmail = hornUser.email;
        const hornUserPassword = hornUser.password;
        signInWithEmailAndPassword(this.afAuth, hornUserEmail, hornUserPassword)
            .then((res: any) => {
                console.log(res.user)
                // console.log(`user is logged in; ${res.user}`)
                this.store.dispatch(new UI.StopLoading);
                // this.store.dispatch(new AUTH.IsLoggedIn(res.user))
                this.router.navigate(['/user', { uid: res.user.uid }])
                // this.postsService.getPostsByUserId()
            })
            .catch((err: any) => {
                console.log(`login failed; ${err}`)
                this.store.dispatch(new UI.StopLoading);
            })
    }
    logOut() {
        this.afAuth.signOut()
            .then((res: any) => {
                console.log(`user is signed out; ${res}`)

                this.store.dispatch(new USER.SetPosts([]))
            })
            .catch((err: any) => {
                console.log(`signing out failed; ${err}`)
            })
    }
    storeUserInDb(userId: string) {
        console.log(userId);
        const userData = { uid: userId, pathsToPosts: [] }
        const path = `users/${userId}`
        const usersRef = doc(this.firestore, path)
        setDoc(usersRef, userData)
            .then((res: any) => console.log(res))
            .catch((err: any) => console.log(err));

    }
}


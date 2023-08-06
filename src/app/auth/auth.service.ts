import { Injectable } from '@angular/core';
import { HornUser } from '../shared/models/user.model';
import {
    Auth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    setPersistence,
    browserSessionPersistence,
    user,
    signOut,
    getAuth,
    onAuthStateChanged,
    User,
    UserCredential,
    GoogleAuthProvider,
    signInWithPopup,
    sendEmailVerification,
    sendPasswordResetEmail
} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromRoot from './../app.reducer';
import * as UI from './../shared/ui.actions';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';
import * as USER from './../user/store/user.actions'
import 'firebase/auth';
import { LoginErrorComponent } from './login/login-error/login-error.component';
import { MatDialog } from '@angular/material/dialog';




@Injectable({
    providedIn: 'root'
})
export class AuthService {



    constructor(
        private afAuth: Auth,
        private router: Router,
        private store: Store<{ ui: fromRoot.State }>,
        private firestore: Firestore,
        private dialog: MatDialog

    ) { }

    sendVerification() {
        const auth = getAuth();
        sendEmailVerification(auth.currentUser)
            .then((res) => {
                console.log(res)
            })
            .catch(err => {
                console.log(err);
            });

    }

    signUp(hornUser: HornUser): void {
        console.log(hornUser);
        const hornUserName = hornUser.name;
        const hornUserEmail = hornUser.email;
        const hornUserPassword = hornUser.password;
        this.store.dispatch(new UI.StartLoading());
        createUserWithEmailAndPassword(this.afAuth, hornUserEmail, hornUserPassword)

            .then((userCredential: UserCredential) => {
                this.sendVerification();
                this.store.dispatch(new UI.StopLoading);
                const userId = userCredential.user.uid
                this.storeUserInDb(userId);
            })
            .catch((err: any) => {
                console.log(`signing up failed'; ${err}`);

                this.store.dispatch(new UI.StopLoading);
            })
    }

    GoogleAuth(): void {
        console.log('googleauth()')
        return this.AuthLogin(new GoogleAuthProvider())
    }

    AuthLogin(provider) {
        const auth = getAuth()
        // let provider = new auth.GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                console.log('you are signed in')
                this.router.navigateByUrl('/test')
            })
            .catch((err) => {
                console.log(err)
            })
    }

    // loginGoogle() {
    //     const auth = getAuth()
    //     auth.signInWithPopup(new auth.GoogleAuthProvider());
    // }

    logIn(hornUser: HornUser) {
        console.log(hornUser)
        this.store.dispatch(new UI.StartLoading());
        const hornUserName = hornUser.name;
        const hornUserEmail = hornUser.email;
        const hornUserPassword = hornUser.password;
        signInWithEmailAndPassword(this.afAuth, hornUserEmail, hornUserPassword)
            .then((userCredential: UserCredential) => {
                this.store.dispatch(new UI.StopLoading);
                this.router.navigate(['/test'])
            })
            .catch((err: any) => {
                console.log(`login failed; ${err}`)
                this.createAuthErrorMessage(err.message)
                this.store.dispatch(new UI.StopLoading);
            })
    }

    createAuthErrorMessage(message: string) {
        if (message.includes('(auth/wrong-password)')) {
            console.log('wrong password');
            const dialogRef = this.dialog.open(LoginErrorComponent, {
                data: {
                    message: 'wrong password'
                }
            })
            dialogRef.afterClosed().subscribe((res) => {
                if (res) {

                }
            })
        } else if (message.includes('(auth/user-not-found)')) {
            const dialogRef = this.dialog.open(LoginErrorComponent, {
                data: {
                    message: 'user-not-found'
                }
            })
        }
    }

    requestNewPassword(email) {
        const auth = getAuth()
        return sendPasswordResetEmail(
            auth, email,
            { url: 'http://localhost:4200/auth' });

    }

    logOut() {
        this.afAuth.signOut()
            .then((res: any) => {
                //console.log(`user is signed out; ${res}`)

                this.store.dispatch(new USER.SetPosts([]))
            })
            .catch((err: any) => {
                //console.log(`signing out failed; ${err}`)
            })
    }
    storeUserInDb(userId: string) {
        //console.log(userId);
        const userData = { uid: userId, pathsToPosts: [] }
        const path = `users/${userId}`
        const usersRef = doc(this.firestore, path)
        setDoc(usersRef, userData)
            .then((res: any) => {
                // console.log(res)
            })
            .catch((err: any) => {
                console.log(err)
            });

    }
    editDisplayName(newDisplayName: string) {
        const auth = getAuth();
        updateProfile(auth.currentUser, {
            displayName: newDisplayName
        })
            .then(() => {
                console.log('display name updated')
            })
            .catch(err => {
                console.log('updating display name failed', err);
            })
        // console.log(newDisplayName)
        // this.afAuth.currentUser.displayName.replace(displayName,newDisplayName )
    }
}


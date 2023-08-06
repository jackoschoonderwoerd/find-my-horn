import { Injectable } from '@angular/core';
import { CombinedPosts, Post } from 'src/app/shared/models/post.model';
import {
    Firestore,
    addDoc,
    collection,
    collectionData,
    collectionGroup,
    doc,
    docData,
    deleteDoc,
    updateDoc,
    DocumentReference,
    setDoc,
    orderBy,
    query,
    where,
    arrayUnion,
    arrayRemove,
    DocumentData
} from '@angular/fire/firestore';
import * as fromRoot from './../app.reducer'
import { Store } from '@ngrx/store';

import { AddHornState } from './../user/my-horns/add-post/store/add-post.reducer';
import { Brand } from 'src/app/shared/models/brand.model';
import { SaxType } from 'src/app/shared/models/saxType.model';
import { Saxophone } from 'src/app/shared/models/saxophone.model';
import { Auth } from '@angular/fire/auth';
import { first, last, take, map, tap, Observable } from 'rxjs';
import { UserData } from 'src/app/shared/models/userData.model';
// import * as USER from './../../store/user.actions'
import * as USER from './../user/store/user.actions'
// import { SetPosts } from '../../store/user.actions';

import * as ADD_POST from './../user/my-horns/add-post/store/add-post.actions'
// import * as UI from './../../../shared/ui.actions';
import * as UI from './../shared/ui.actions';
import { SaxophoneSearchCriterea as SSC } from 'src/app/shared/models/saxophone.model';
// import * as SEARCH from './../../search/store/search.actions'
import * as SEARCH from 'src/app/user/search/store/search.actions'
import { Router } from '@angular/router';



@Injectable({
    providedIn: 'root'
})
export class PostsService {

    // combinedPosts: Post[][] = [];
    combinedPosts: Post[][] = [];
    posts: Post[]

    constructor(
        private firestore: Firestore,
        private store: Store<fromRoot.State>,
        private afAuth: Auth,
        private router: Router
    ) { }


    addPost(post: Post) {
        //console.log(post);
        const brand = post.saxophone.brand;
        const saxType = post.saxophone.saxType;
        const serialNumber = post.saxophone.serialNumber
        const path = `saxes/${brand.id}/saxTypes/${saxType.id}/serialNumbers/${serialNumber}/posts`
        const postRef = collection(this.firestore, path)
        return this.checkForExistingSerialNumber(brand, saxType, serialNumber)
            .then((res: any) => {
                //console.log(res)
                addDoc(postRef, post).then((res) => {
                    console.log(res)
                    console.log(res.id)
                    const postId = res.id
                    this.addPostArrayPathToUser(brand, saxType, serialNumber)
                    this.addPostPathToUser(postId)
                })
                    .then((res) => {
                        //console.log(res);
                        // this.getPostsByUserId();
                        this.store.dispatch(new ADD_POST.ClearAll())
                    })
                    .catch(err => {
                        console.log(err)
                    })
            })
            .catch(err => {
                console.log(err)
            })
    }

    ifPostComplete(post: Post) {
        if (
            post.saxophone.brand &&
            post.saxophone.saxType &&
            post.saxophone.serialNumber &&
            post.dateOfPurchase &&
            post.comment &&
            post.datePosted) {
            return true
        } else {
            //console.log(post)
            return false
        }
    }

    addPostArrayPathToUser(brand: Brand, saxType: SaxType, serialNumber: string) {
        //console.log('adding pathToHorn to pathsToPosts');
        const pathToHorn = `saxes/${brand.id}/saxTypes/${saxType.id}/serialNumbers/${serialNumber}/posts`
        const userId = this.afAuth.currentUser.uid;
        const path = `users/${userId}`
        const docRef = doc(this.firestore, path)
        updateDoc(docRef, { pathsToPosts: arrayUnion(pathToHorn) })
            .then((res) => console.log(res))
            .catch(err => console.log(err));
    }

    addPostPathToUser(postId: string) {
        const userId = this.afAuth.currentUser.uid;
        const path = `users/${userId}/posts/${postId}`
        const postRef = doc(this.firestore, path)
        setDoc(postRef, {})
    }

    getPostsPathsByUid(userId: string) {
        console.log(userId)
        const path = `users/${userId}`;
        const pathsObjectRef = doc(this.firestore, path)
        return docData(pathsObjectRef).pipe(map((postsObject: any) => {
            if (postsObject) {
                console.log(postsObject)
                const pathArray: string[] = postsObject['pathsToPosts']
                return pathArray
            }


        }))
    }

    getPostsByPath(path: string): Observable<DocumentData[]> {
        // this.store.dispatch(new UI.StartLoading())
        const postRef = collection(this.firestore, path)
        const postQuery = query(postRef, orderBy('datePosted'))
        return collectionData(postQuery, { idField: 'id' })
            .pipe(
                // map((el) => console.log(el))
                tap(() => {
                    // console.log('hi')
                    this.router.navigateByUrl('paths')
                })
            )

    }


    checkForExistingSerialNumber(brand: Brand, saxType: SaxType, serialNumber: string): Promise<any> {
        const path = `saxes/${brand.id}/saxTypes/${saxType.id}/serialNumbers/${serialNumber}`
        const serialNumberRef = doc(this.firestore, path);
        const fillerPromise = new Promise((resolve, reject) => {

            docData(serialNumberRef).subscribe((res) => {
                //console.log(res)
                if (res == undefined) {
                    const filler = { my: 'my' }
                    const fillerRef = doc(this.firestore, path)
                    setDoc(fillerRef, filler)
                        .then((res: any) => {
                            resolve(true)
                        })
                } else {
                    resolve(true)
                }
            })
        })
        return fillerPromise;
    }

    getPostPaths() {
        const uid = this.afAuth.currentUser.uid;
        const path = `users/${uid}`
        const userRef = doc(this.firestore, path)
        const pathsPromise = new Promise((resolve, reject) => {
            docData(userRef).pipe(take(1)).subscribe(userData => {
                if (userData && userData.pathsToPosts) {
                    const pathsToPosts: string[] = userData.pathsToPosts;

                    resolve(pathsToPosts);

                } else {
                    this.store.dispatch(new UI.StopLoading())
                    console.log('no paths')
                }
            })
        })
        return pathsPromise
    }

    // getPostsByUserId() {
    //     this.store.dispatch(new UI.StartLoading())
    //     // this.store.dispatch(new USER.SetPosts([]))
    //     this.combinedPosts = []
    //     //console.log('getPostsByUserId()')
    //     this.getPostPaths()
    //         .then((postsPaths: string[]) => {
    //             if (postsPaths.length) {
    //                 postsPaths.forEach((postsPath: string) => {
    //                     // console.log(postsPath)
    //                     const postsRef = collection(this.firestore, postsPath);
    //                     // collectionData(postsRef, { idField: 'id' }).pipe(take(1))

    //                     //     .subscribe((posts: Post[]) => {
    //                     //         console.log(posts);
    //                     //         this.addPostsToCombinedPosts(posts)
    //                     //     })
    //                 })
    //             } else {
    //                 console.log(`no horns for userId`)
    //             }
    //         });
    // }

    // addPostsToCombinedPosts(posts: Post[]) {

    //     if (posts.length) {
    //         // console.log(posts)
    //         this.combinedPosts.push(posts);
    //         // console.log(this.combinedPosts)
    //         this.combinedPosts = Object.values(this.combinedPosts);
    //         const result = this.combinedPosts.map(arr => [...arr]);
    //         const uniqueArray = result.filter((value, index, self) => self.indexOf(value) === index);
    //         uniqueArray.forEach((postsArray: any) => {
    //             //console.log(postsArray)
    //             postsArray.forEach((post: any) => {
    //                 //console.log(typeof (post.datePosted.seconds))
    //             })
    //             postsArray.sort((a, b) => {
    //                 return a.datePosted.seconds - b.datePosted.seconds
    //             })
    //         })
    //         console.log(uniqueArray)
    //         this.store.dispatch(new USER.SetPosts(uniqueArray))
    //         this.store.dispatch(new UI.StopLoading())
    //     }
    // }





    deletePost(post: Post) {
        const brand = post.saxophone.brand;
        const saxType = post.saxophone.saxType;
        const serialNumber = post.saxophone.serialNumber;
        const pathToPost = `saxes/${brand.id}/saxTypes/${saxType.id}/serialNumbers/${serialNumber}/posts/${post.id}`
        //console.log(pathToPost);
        const docRef = doc(this.firestore, pathToPost)
        return deleteDoc(docRef)
            .then(res => {
                //console.log(res)
                // this.getPostsByUserId()
                this.removePathFromUserPathsToPosts(pathToPost)

            })
            .catch(err => console.log(err));
    }


    removePathFromUserPathsToPosts(pathToPost: string) {
        //console.log(pathToPost)
        const userId = this.afAuth.currentUser.uid;
        const userDataPath = `users/${userId}`;
        const userDataRef = doc(this.firestore, userDataPath);
        docData(userDataRef).subscribe((userData: any) => {
            //console.log(userData)
            //console.log(userData.pathsToPosts)
        })

    }
    findPostsBySsc(ssc: SSC) {
        const path = `saxes/${ssc.brand.id}/saxTypes/${ssc.saxType.id}/serialNumbers/${ssc.serialNumber}/posts`;
        const docRef = collection(this.firestore, path);
        collectionData(docRef).subscribe((posts: Post[]) => {
            //console.log(posts);
            this.store.dispatch(new SEARCH.SetFoundPosts(posts));
        })
    }
    updatePostComment(post: Post, updatedComment: string) {
        console.log(updatedComment)
        const path =
            `saxes/${post.saxophone.brand.id}/saxTypes/${post.saxophone.saxType.id}/serialNumbers/${post.saxophone.serialNumber}/posts/${post.id}`
        console.log(path)
        const docRef = doc(this.firestore, path)
        return updateDoc(docRef, { comment: updatedComment })
    }

    updatePostDateOfPurchase(post: Post, dateOfPurchase: Date) {

    }
    updateComment(post: Post, updatedComment: string) {
        // console.log(post, updatedComment)
        const path = `saxes/${post.saxophone.brand.id}/saxTypes/${post.saxophone.saxType.id}/serialNumbers/${post.saxophone.serialNumber}/posts/${post.id}`
        const postRef = doc(this.firestore, path)
        return updateDoc(postRef, { comment: updatedComment })
    }
}

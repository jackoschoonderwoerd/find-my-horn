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
    arrayRemove
} from '@angular/fire/firestore';
import * as fromRoot from './../../../app.reducer'
import { Store } from '@ngrx/store';
import { AddHornState } from '../add-post/store/add-post.reducer';
import { Brand } from 'src/app/shared/models/brand.model';
import { SaxType } from 'src/app/shared/models/saxType.model';
import { Saxophone } from 'src/app/shared/models/saxophone.model';
import { Auth } from '@angular/fire/auth';
import { first, last, take, map } from 'rxjs';
import { UserData } from 'src/app/shared/models/userData.model';
import * as USER from './../../store/user.actions'
import { SetPosts } from '../../store/user.actions';

@Injectable({
    providedIn: 'root'
})
export class PostsService {

    // combinedPosts: Post[][] = [];
    combinedPosts: Post[][] = [];

    constructor(
        private firestore: Firestore,
        private store: Store<fromRoot.State>,
        private afAuth: Auth
    ) { }


    addPost() {
        this.store.select(fromRoot.getAddHornState).subscribe((addHornState: AddHornState) => {
            console.log(addHornState)
            const brand: Brand = addHornState.brand;
            const saxType: SaxType = addHornState.saxType;
            const serialNumber = addHornState.serialNumber;
            const comment = addHornState.comment;
            const dateOfPurchase = addHornState.dateOfPurchase;
            const saxophone: Saxophone = {
                brand: brand,
                saxType: saxType,
                serialNumber: serialNumber
            }
            const post: Post = {
                datePosted: new Date(),
                saxophone: saxophone,
                dateOfPurchase: dateOfPurchase,
                comment: comment
            }
            const path = `saxes/${brand.id}/saxTypes/${saxType.id}/serialNumbers/${serialNumber}/posts`
            const postRef = collection(this.firestore, path)
            this.checkForExistingSerialNumber(brand, saxType, serialNumber)
                .then((res: any) => {
                    console.log(res)
                    addDoc(postRef, post).then((res) => {
                        console.log(res)
                        this.addPostPathToUser(brand, saxType, serialNumber)
                    })
                        .then((res) => {
                            console.log(res);
                            this.getPostsByUserId();
                        })
                        .catch(err => console.log(err))
                })
                .catch(err => console.log(err))
        })
        this.clearAllAddHornFields()
    }

    addPostPathToUser(brand: Brand, saxType: SaxType, serialNumber: string) {
        console.log('adding pathToHorn to pathsToPosts');
        const pathToHorn = `saxes/${brand.id}/saxTypes/${saxType.id}/serialNumbers/${serialNumber}/posts`
        const userId = this.afAuth.currentUser.uid;
        const path = `users/${userId}`
        const docRef = doc(this.firestore, path)
        updateDoc(docRef, { pathsToPosts: arrayUnion(pathToHorn) })
            .then((res) => console.log(res))
            .catch(err => console.log(err));
    }

    clearAllAddHornFields() {

    }

    checkForExistingSerialNumber(brand: Brand, saxType: SaxType, serialNumber: string): Promise<any> {
        const path = `saxes/${brand.id}/saxTypes/${saxType.id}/serialNumbers/${serialNumber}`
        const serialNumberRef = doc(this.firestore, path);
        const fillerPromise = new Promise((resolve, reject) => {

            docData(serialNumberRef).subscribe((res) => {
                console.log(res)
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
                    console.log('no paths')
                }
            })
        })
        return pathsPromise
    }

    getPostsByUserId() {

        this.combinedPosts = []
        console.log('getPostsByUserId()')
        this.getPostPaths()
            .then((postsPaths: string[]) => {
                if (postsPaths) {
                    postsPaths.forEach((postsPath: string) => {
                        console.log(postsPath)
                        const postsRef = collection(this.firestore, postsPath);
                        collectionData(postsRef, { idField: 'id' }).pipe(take(1))
                            .subscribe((posts: Post[]) => {
                                this.addPostsToCombinedPosts(posts)
                            })
                    })
                } else {
                    console.log(`no horns for userId`)
                }
            });
    }

    addPostsToCombinedPosts(posts: Post[]) {

        // this.store.dispatch(new USER.SetPosts([]))
        // this.combinedPosts = []
        console.log(posts)
        if (posts) {
            this.combinedPosts.push(posts);
            console.log(typeof this.combinedPosts)
            this.combinedPosts = Object.values(this.combinedPosts);
            const result = this.combinedPosts.map(arr => [...arr]);
            const uniqueArray = result.filter((value, index, self) => self.indexOf(value) === index);
            uniqueArray.forEach((postsArray: Post[]) => {
                console.log(postsArray)
                postsArray.forEach((post: any) => {
                    console.log(post.datePosted.seconds)
                })
            })
            this.store.dispatch(new USER.SetPosts(uniqueArray))
        }
    }

    // getPostsByPostpath(postPath: string) {
    //     const postsRef = collection(this.firestore, postPath)
    //     collectionData(postsRef).pipe(first()).subscribe((posts: Post[]) => {
    //         console.log(posts)
    //     })
    // }



    deletePost(post: Post) {
        const brand = post.saxophone.brand;
        const saxType = post.saxophone.saxType;
        const serialNumber = post.saxophone.serialNumber;
        const pathToPost = `saxes/${brand.id}/saxTypes/${saxType.id}/serialNumbers/${serialNumber}/posts/${post.id}`
        console.log(pathToPost);
        const docRef = doc(this.firestore, pathToPost)
        return deleteDoc(docRef)
            .then(res => {
                console.log(res)
                this.getPostsByUserId()
                this.removePathFromUserPathsToPosts(pathToPost)

            })
            .catch(err => console.log(err));
    }

    // removePathFromUserPathsToPosts(postsPath: string) {
    //     // console.log(post);
    //     // const brandId: string = post.saxophone.brand.id;
    //     // const saxTypeId: string = post.saxophone.saxType.id;
    //     // const serialNumber: string = post.saxophone.serialNumber;
    //     const userId: string = this.afAuth.currentUser.uid;

    //     console.log(userId)

    //     // const postsPath = `saxes/${brandId}/saxTypes/${saxTypeId}/serialNumbers/${serialNumber}/posts`
    //     const path = `users/${userId}`

    //     const userRef = doc(this.firestore, path)
    //     docData(userRef).subscribe((userData: any) => {
    //         const pathsToPosts: string[] = userData.pathsToPosts
    //         console.log(pathsToPosts);
    //     })
    // }

    // saxes/87pduTFlr2S64dmaSi7G/saxTypes/RoXhhMkbegOxO0gxtjlv/serialNumbers/123456/posts

    removePathFromUserPathsToPosts(pathToPost: string) {
        console.log(pathToPost)
        const userId = this.afAuth.currentUser.uid;
        const userDataPath = `users/${userId}`;
        const userDataRef = doc(this.firestore, userDataPath);
        docData(userDataRef).subscribe((userData: any) => {
            console.log(userData)
            console.log(userData.pathsToPosts)
        })
        // const pathToUserPathsToPostsArrayRef = doc(this.firestore, pathToUserPathsToPostsArray);
        // updateDoc(pathToUserPathsToPostsArrayRef, arrayRemove({'':''}))
        // docData(docRef).pipe(take(1)).subscribe(data => {
        //     console.log(data)
        //     let pathsToPosts: string[] = data.pathsToPosts
        //     let newPathsToPosts = pathsToPosts.filter((path: string) => {
        //         return path == pathToPost
        //     })
        //     console.log(newPathsToPosts)
        //     updateDoc(docRef, { pathsToPosts: newPathsToPosts })
        //         .then((res: any) => {
        //             console.log(res)
        //             this.store.subscribe((storeData: any) => {
        //                 console.log(storeData.user);
        //                 this.getPostsByUserId();
        //             })
        //         })
        //         .catch(err => console.log(err))
        // })
    }


}

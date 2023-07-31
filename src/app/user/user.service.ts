import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';

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

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(
        private afAuth: Auth,
        private firestore: Firestore
    ) { }

    getUser() {
        const userId = this.afAuth.currentUser.uid;
        const path = `users/${userId}`
        const docRef = doc(this.firestore, path)
        return docData(docRef)
    }
}

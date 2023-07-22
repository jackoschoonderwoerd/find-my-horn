import { Injectable } from '@angular/core';
import { BehaviorSubject, take, first } from 'rxjs';
import { Saxophone } from 'src/app/shared/models/saxophone.model';
import { SaxophoneSearchCriterea as SSC } from 'src/app/shared/models/saxophone.model';
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
    arrayUnion
} from '@angular/fire/firestore';
import { Post } from 'src/app/shared/models/post.model';
import { CommonModule } from '@angular/common';
import { SaxType } from 'src/app/shared/models/saxType.model';
import { Store } from '@ngrx/store';
// import * as fromAddHorn from './add-post/store/add-post.reducer'
import * as ADD_HORN from './add-post/store/add-post.actions'
import * as ADMIN from './../../admin/store/admin.actions'
import * as fromRoot from './../../app.reducer'
import { Brand } from 'src/app/shared/models/brand.model';
import { Auth } from '@angular/fire/auth';
// import { AddHornState } from './add-post/store/add-post.reducer';
import { BRAND } from '../../admin/store/admin.actions';
import * as USER from './../../user/store/user.actions'
import { UserData } from 'src/app/shared/models/userData.model';


@Injectable({
    providedIn: 'root'
})
export class HornService {

    addPostVisibleSubject = new BehaviorSubject<boolean>(null);
    addPostVisible$ = this.addPostVisibleSubject.asObservable()

    brands: string[] = [
        'yamaha',
        'selmer',
        'other'
    ]
    types: string[] = [
        'soprano',
        'alto',
        'tenor',
        'baritone',
        'other'
    ]

    constructor(
        private firestore: Firestore,
        private store: Store<fromRoot.State>,
        private afAuth: Auth
    ) { }

    getBrands() {
        return this.brands;
    }

    getTypes(brandId: string) {
        // return this.types
        const path = `saxes/${brandId}/saxTypes`;
        const typesRef = collection(this.firestore, path)
        collectionData(typesRef, { idField: 'id' }).subscribe((saxTypes: SaxType[]) => {
            console.log(saxTypes)
            this.store.dispatch(new ADMIN.SetAvailableSaxTypes(saxTypes));
        })
    }

    readHorn() {
        this.store.subscribe(storeData => {
            console.log(storeData)
            const brand: Brand = storeData.addHorn.brand;
            const saxType: SaxType = storeData.addHorn.saxType;
            const serialNumber = storeData.addHorn.serialNumber;


            const path = `saxes/${brand.id}/saxTypes/${saxType.id}/serialNumbers/${serialNumber}`
            const saxRef = doc(this.firestore, path)
            docData(saxRef).subscribe(data => console.log(data))
        });
    }










}

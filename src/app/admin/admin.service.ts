import { Injectable } from '@angular/core';
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
    where
} from '@angular/fire/firestore';
import * as fromRoot from './../app.reducer'
import { Store } from '@ngrx/store';
import * as ADMIN from './store/admin.actions'
import { Brand } from '../shared/models/brand.model';
import { Saxophone } from '../shared/models/saxophone.model';
import { JsonPipe } from '@angular/common';
import { Observable, first } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class AdminService {

    constructor(
        private firestore: Firestore,
        private store: Store<{ admin: fromRoot.State }>
    ) { }

    readBrandNames() {
        const path = 'saxes'
        const saxesRef = collection(this.firestore, path)
        collectionData(saxesRef, { idField: 'id' }).subscribe((data: Brand[]) => {
            // console.log(data)
            this.store.dispatch(new ADMIN.SetBrands(data))
        }
        )
    }

    addBrand(newBrand: any) {
        return this.checkForExistingBrandName(newBrand)
            .then(res => {
                console.log(res)
                if (res) {
                    const path = 'saxes'
                    const brandRef = collection(this.firestore, path)
                    return addDoc(brandRef, newBrand)
                }
            })
            .catch(err => { console.log(err) })
    }

    checkForExistingBrandName(newBrand: Brand) {
        console.log(newBrand)
        const exists = new Promise((resolve, reject) => {
            this.store.select(fromRoot.getBrands).pipe(first()).subscribe((brands: Brand[]) => {
                console.log(brands)
                const index = brands.findIndex((brand: Brand) => {
                    return brand.name === newBrand.name
                })
                console.log(index)
                if (index != -1) {
                    resolve(false)
                } else {
                    resolve(true)
                }
            })
        })
        return exists;
    }

    getBrand(brandId: string) {
        const path = `saxes/${brandId}`
        const brandRef = doc(this.firestore, path)
        docData(brandRef).subscribe((brand: Brand) => {
            this.store.dispatch(new ADMIN.SetBrand(brand));
        });
    }

    updateBrand(brand: Brand) {
        console.log('updating brand')
        const path = `saxes/${brand.id}`
        const brandRef = doc(this.firestore, path)
        setDoc(brandRef, brand).then(data => console.log(data))
    }
    deleteBrand(id: string) {
        console.log('deleting brand')
        const path = `saxes/${id}`
        const brandRef = doc(this.firestore, path)
        deleteDoc(brandRef).then(data => console.log(data))
    }
}

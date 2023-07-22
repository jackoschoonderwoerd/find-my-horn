import { Injectable, Input } from '@angular/core';
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
    and
} from '@angular/fire/firestore';
import * as fromRoot from './../../../app.reducer';
import * as ADMIN from './../../store/admin.actions'
import { Store } from '@ngrx/store';
import { Brand } from 'src/app/shared/models/brand.model';
import { Observable, map } from 'rxjs';
import { SaxType } from 'src/app/shared/models/saxType.model';

@Injectable({
    providedIn: 'root'
})
export class BrandDetailsService {

    saxTypes: SaxType[] = [
        { name: 'soprano' },
        { name: 'alto' },
        { name: 'tenor' },
        { name: 'baritone' }
    ]



    constructor(
        private fireStore: Firestore,
        private store: Store<fromRoot.State>
    ) { }

    getSaxTypes() {
        return this.saxTypes;
    }
    getTypesInUse(id: string) {
        const path = `saxes/${id}/saxTypes`;
        const typesRef = collection(this.fireStore, path)
        collectionData(typesRef, { idField: 'id' }).subscribe((saxTypesInUse: SaxType[]) => {

            const availableSaxTypes: SaxType[] = []
            saxTypesInUse.forEach((saxType: SaxType) => {
                console.log(saxType.name)
            })
            this.saxTypes.forEach((saxType: SaxType) => {
                console.log(saxType.name)
            })

            this.saxTypes.forEach((saxType: SaxType) => {
                const index = saxTypesInUse.findIndex((saxTypeInUse: SaxType) => {
                    return saxType.name === saxTypeInUse.name
                })
                console.log(index)
                if (index === -1) {
                    availableSaxTypes.push(saxType)
                }

            })
            console.log(availableSaxTypes)
            this.store.dispatch(new ADMIN.SetAvailableSaxTypes(availableSaxTypes))

            this.store.dispatch(new ADMIN.SetSaxTypesInUse(saxTypesInUse))

        })
    }
    deleteTypeInUse(brandId: string, typeId: string) {
        const path = `saxes/${brandId}/saxTypes/${typeId}`
        const typeRef = doc(this.fireStore, path);
        return deleteDoc(typeRef)
    }
    addType(brandId: string, saxType: string) {
        console.log(`adding type; ${brandId}-${saxType}`)
        const type = { name: saxType }
        const path = `saxes/${brandId}/saxTypes`
        const typesRef = collection(this.fireStore, path);
        return addDoc(typesRef, type)
    }
}

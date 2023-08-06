import { Action } from "@ngrx/store";
import { Brand } from "src/app/shared/models/brand.model";
import { SaxType } from "src/app/shared/models/saxType.model";



export const SELECTED_BRAND = '[Add Post] Set Brand';
export const SELECTED_SAX_TYPE = '[Add Horm] Set Selected Sax Type';
export const SERIAL_NUMBER = '[Add Post] Set Serial Number';
export const DATE_OF_PURCHASE = '[Add Post] Date Of Purchase';
export const COMMENT = '[Add Post] Comment';
export const CLEAR_ALL = '[Add Post] Clear All';
export const SHOW_ADD_SAXOPHONE = '[Add Post] Adding Saxophone';
export const ADD_POST_TO_REGISTERED_SAXOPHONE = '[Add Post To Registered Saxophone] '

export class SetBrand implements Action {
    readonly type = SELECTED_BRAND;
    constructor(public brand: Brand) {
    }
}
export class SetSelectedSaxType implements Action {
    readonly type = SELECTED_SAX_TYPE;
    constructor(public saxType: SaxType) { }
}
export class SetSerialNumber implements Action {
    readonly type = SERIAL_NUMBER;
    constructor(public serialNumber: string) { }
}
export class SetDateOfPurchase implements Action {
    readonly type = DATE_OF_PURCHASE;
    constructor(public dateOfPurchase: Date) { }
}
export class SetComment implements Action {
    readonly type = COMMENT;
    constructor(public comment: string) { }
}
export class ClearAll implements Action {
    readonly type = CLEAR_ALL
}
export class ShowAddSaxophone implements Action {
    readonly type = SHOW_ADD_SAXOPHONE;
    constructor(public showing: boolean) { }
}
export class AddPostToRegisteredSaxophone implements Action {
    readonly type = ADD_POST_TO_REGISTERED_SAXOPHONE;
    constructor(public adding: boolean) { }
}


export type AddHornActions =
    SetBrand |
    SetSelectedSaxType |
    SetSerialNumber |
    SetDateOfPurchase |
    SetComment |
    ShowAddSaxophone |
    ClearAll


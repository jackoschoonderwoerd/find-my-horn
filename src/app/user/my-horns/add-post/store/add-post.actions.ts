import { Action } from "@ngrx/store";
import { Brand } from "src/app/shared/models/brand.model";
import { SaxType } from "src/app/shared/models/saxType.model";



export const SELECTED_BRAND = '[Add Horn] Set Brand';
// export const SELECTED_SAX_TYPES = '[Add Horn] Set Selected Sax Types';
export const SELECTED_SAX_TYPE = '[Add Horm] Set Selected Sax Type';
export const SERIAL_NUMBER = '[Add Horn] Set Serial Number';
export const DATE_OF_PURCHASE = '[Add Horn] Date Of Purchase';
export const COMMENT = '[Add Horn] Comment';
export const CLEAR_ALL = '[Add Horn] Clear All'

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


export type AddHornActions =
    SetBrand |
    SetSelectedSaxType |
    SetSerialNumber |
    SetDateOfPurchase |
    SetComment |
    ClearAll


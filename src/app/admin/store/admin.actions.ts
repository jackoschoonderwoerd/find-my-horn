import { Action } from "@ngrx/store";
import { Brand } from "src/app/shared/models/brand.model";
import { SaxType } from "src/app/shared/models/saxType.model";


export const BRANDS = '[Admin] Brands';
export const BRAND = '[Admin] Brand'
export const SAX_TYPES_IN_USE = '[Admin] Sax Types In Use';
export const AVAILABLE_SAX_TYPES = '[Admin] Available Sax Types'

export class SetBrands implements Action {
    readonly type = BRANDS;
    constructor(public brands: Brand[]) { }
}

export class SetBrand implements Action {
    readonly type = BRAND;
    constructor(public brand: Brand) { }
}

export class SetSaxTypesInUse implements Action {
    readonly type = SAX_TYPES_IN_USE;
    constructor(public saxTypes: SaxType[]) { }
}

export class SetAvailableSaxTypes implements Action {
    readonly type = AVAILABLE_SAX_TYPES;
    constructor(public saxTypes: SaxType[]) { }
}

export type AdminActions = SetBrands | SetBrand | SetSaxTypesInUse | SetAvailableSaxTypes


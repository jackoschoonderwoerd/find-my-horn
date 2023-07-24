
import { SaxType } from "src/app/shared/models/saxType.model"
import { BRANDS, BRAND, SAX_TYPES_IN_USE, AVAILABLE_SAX_TYPES } from "./admin.actions"
import { Brand } from "src/app/shared/models/brand.model"

export interface AdminState {
    brands: Brand[];
    brand: Brand;
    saxTypesInUse: SaxType[];
    availableSaxTypes: SaxType[];
}

const initialState: AdminState = {
    brands: [],
    brand: null,
    saxTypesInUse: [],
    availableSaxTypes: []
}

export function adminReducer(state = initialState, action: any) {
    switch (action.type) {
        case BRANDS: {
            return {
                ...state,
                brands: action.brands
            }
        }
        case BRAND: {
            return {
                ...state,
                brand: action.brand
            }
        }
        case SAX_TYPES_IN_USE: {
            //console.log(action)
            return {
                ...state,
                saxTypesInUse: action.saxTypes
            }
        }
        case AVAILABLE_SAX_TYPES: {
            return {
                ...state,
                availableSaxTypes: action.saxTypes
            }
        }
        default: {
            return state
        }
    }
}

export const getBrands = (adminState: AdminState) => adminState.brands;
export const getBrand = (adminState: AdminState) => adminState.brand;
export const getSaxTypesInUse = (adminState: AdminState) => adminState.saxTypesInUse;
export const getAvailableSaxTypes = (adminState: AdminState) => adminState.availableSaxTypes

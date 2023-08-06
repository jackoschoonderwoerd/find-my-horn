import { SaxType } from "src/app/shared/models/saxType.model";
import {
    ADD_POST_TO_REGISTERED_SAXOPHONE,
    CLEAR_ALL,
    COMMENT,
    DATE_OF_PURCHASE,
    SELECTED_BRAND,
    SELECTED_SAX_TYPE,
    SERIAL_NUMBER,
    SHOW_ADD_SAXOPHONE
} from "./add-post.actions"
import { Brand } from "src/app/shared/models/brand.model";

export interface AddHornState {
    brand: Brand
    saxType: SaxType;
    serialNumber: string;
    dateOfPurchase: Date;
    comment: string;
    showAddSaxophone: boolean;
    addPostToRegisteredSaxophone: boolean
}

const initialState: AddHornState = {
    brand: null,
    saxType: null,
    serialNumber: null,
    dateOfPurchase: null,
    comment: null,
    showAddSaxophone: false,
    addPostToRegisteredSaxophone: false
}

export function addHornReducer(state = initialState, action: any) {
    switch (action.type) {
        case SELECTED_BRAND: {
            //console.log(action.brand)
            return {
                ...state,
                brand: action.brand
            }
        }
        case SELECTED_SAX_TYPE: {
            return {
                ...state,
                saxType: action.saxType
            }
        }
        case SERIAL_NUMBER: {
            //console.log(action)
            return {
                ...state,
                serialNumber: action.serialNumber
            }
        }
        case DATE_OF_PURCHASE: {
            return {
                ...state,
                dateOfPurchase: action.dateOfPurchase
            }
        }
        case COMMENT: {
            return {
                ...state,
                comment: action.comment
            }
        }
        case SHOW_ADD_SAXOPHONE: {
            return {
                ...state,
                showAddSaxophone: action.showing
            }
        }
        case ADD_POST_TO_REGISTERED_SAXOPHONE: {
            return {
                ...state,
                addPostToRegisteredSaxophone: action.adding
            }
        }
        case CLEAR_ALL: {
            //console.log(action)
            return {
                ...state,
                brand: null,
                saxType: null,
                serialNumber: null,
                dateOfPurchase: null,
                comment: null
            }
        }
        default: {
            return state
        }
    }
}

export const getSelectedBrand = (addHornState: AddHornState) => addHornState.brand;
export const getSelectedSaxType = (addHornState: AddHornState) => addHornState.saxType;
export const getSerialNumber = (addHornState: AddHornState) => addHornState.serialNumber;
export const getDateOfPurchase = (addHornState: AddHornState) => addHornState.dateOfPurchase;
export const getComment = (addHornState: AddHornState) => addHornState.comment;
export const getState = (addHornState: AddHornState) => addHornState;
export const getShowAddSaxophone = (addHornstate: AddHornState) => addHornstate.showAddSaxophone;
export const getAddPostToRegisteredSaxophone = (addHornState: AddHornState) => addHornState.addPostToRegisteredSaxophone;
export const clearAll = (addHornState: AddHornState) => addHornState;

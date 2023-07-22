import { Action, createReducer } from "@ngrx/store";
import { UIActions, START_LOADING, STOP_LOADING } from './ui.actions'

export interface UiState {
    isLoading: boolean
}

const initialState: UiState = {
    isLoading: false
}

export function uiReducer(state = initialState, action: Action) {
    switch (action.type) {
        case START_LOADING:
            return {
                ...state,
                isLoading: true
            };
        case STOP_LOADING:
            return {
                ...state,
                isLoading: false
            };
        default:
            return state;
    }
}


// export const uiReducer = createReducer(
//     initialState
// )

export const getIsLoading = (uiState: UiState) => uiState.isLoading;

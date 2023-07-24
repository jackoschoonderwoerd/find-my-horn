import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromUi from './shared/ui.reducer';
// import * as fromAuth from './auth/auth-store/auth.reducer';
import * as fromAdmin from './admin/store/admin.reducer';
import * as fromAddHorn from './user/my-horns/add-post/store/add-post.reducer'
import * as fromUser from './user/store/user.reducer';
import * as fromSearch from './user/search/store/search.reducer'



export interface State {
    ui: fromUi.UiState,
    // auth: fromAuth.AuthState,
    admin: fromAdmin.AdminState,
    addHorn: fromAddHorn.AddHornState,
    user: fromUser.UserState,
    search: fromSearch.SearchState
}

export const reducers: ActionReducerMap<State> = {
    ui: fromUi.uiReducer,
    // auth: fromAuth.authReducer,
    admin: fromAdmin.adminReducer,
    addHorn: fromAddHorn.addHornReducer,
    user: fromUser.userReducer,
    search: fromSearch.searchReducer
}

export const getUiState = createFeatureSelector<fromUi.UiState>('ui');
export const getIsLoading = createSelector(getUiState, fromUi.getIsLoading)


// export const getAuthState = createFeatureSelector<fromAuth.AuthState>('auth');
// export const getIsLoggedIn = createSelector(getAuthState, fromAuth.getIsLoggedIn)
// export const getUser = createSelector(getAuthState, fromAuth.getUser)

export const getAdminState = createFeatureSelector<fromAdmin.AdminState>('admin');
export const getBrands = createSelector(getAdminState, fromAdmin.getBrands);
export const getBrand = createSelector(getAdminState, fromAdmin.getBrand);
export const getSaxTypes = createSelector(getAdminState, fromAdmin.getSaxTypesInUse);
export const getAvailableSaxTypes = createSelector(getAdminState, fromAdmin.getAvailableSaxTypes);

export const getHornState = createFeatureSelector<fromAddHorn.AddHornState>('addHorn');
export const getSelectedBrand = createSelector(getHornState, fromAddHorn.getSelectedBrand);
export const getSelectedSaxType = createSelector(getHornState, fromAddHorn.getSelectedSaxType);
export const getSerialNumber = createSelector(getHornState, fromAddHorn.getSerialNumber);
export const getDateOfPurchase = createSelector(getHornState, fromAddHorn.getDateOfPurchase);
export const getComment = createSelector(getHornState, fromAddHorn.getComment);
export const getAddHornState = createSelector(getHornState, fromAddHorn.getState);
export const clearAll = createSelector(getHornState, fromAddHorn.clearAll);

export const getUserState = createFeatureSelector<fromUser.UserState>('user');
export const getPosts = createSelector(getUserState, fromUser.getPosts);

export const getSearchState = createFeatureSelector<fromSearch.SearchState>('search');
export const getFoundPosts = createSelector(getSearchState, fromSearch.getFoundPosts)

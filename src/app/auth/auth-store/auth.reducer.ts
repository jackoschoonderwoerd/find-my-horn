// import { Action } from "@ngrx/store";
// import { AuthActions, IS_LOGGED_IN, IS_LOGGED_OUT } from "./auth.actions";
// import { User as FirebaseUser } from "@angular/fire/auth";

// export interface AuthState {
//     isLoggedIn: boolean
//     user: FirebaseUser
// }

// const initialState: AuthState = {
//     isLoggedIn: false,
//     user: null
// }

// export function authReducer(state = initialState, action: any) {
//     switch (action.type) {
//         case IS_LOGGED_IN: {
//             console.log(action)
//             return {
//                 ...state,
//                 user: action.firebaseUser,
//                 isLoggedIn: true
//             }

//         }
//         case IS_LOGGED_OUT: {
//             console.log(action)
//             return {
//                 ...state,
//                 user: null,
//                 isLoggedIn: false
//             }
//         }
//         default: {
//             return {
//                 ...state
//             }
//         }
//     }
// }


// export const getIsLoggedIn = (authState: AuthState) => authState.isLoggedIn;
// export const getUser = (authState: AuthState) => authState.user;

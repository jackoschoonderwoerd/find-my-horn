import { Action } from "@ngrx/store";
import { Post } from "src/app/shared/models/post.model";
import { POSTS } from "./user.actions";

export interface UserState {
    posts: Post[]
}

const initialState: UserState = {
    posts: []
}

export function userReducer(state = initialState, action: any) {
    switch (action.type) {
        case POSTS:
            console.log(action)
            return {
                ...state,
                posts: action.posts
            }
        default: {
            return state
        }
    }
}

export const getPosts = (userState: UserState) => userState.posts;

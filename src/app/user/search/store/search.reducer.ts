import { Post } from "src/app/shared/models/post.model";
import { FOUND_POSTS } from "./search.actions";


export interface SearchState {
    foundPosts: Post[]
}

const initialState: SearchState = {
    foundPosts: []
}

export function searchReducer(state = initialState, action: any) {
    switch (action.type) {
        case FOUND_POSTS:
            console.log(action);
            return {
                ...state,
                foundPosts: action.foundPosts
            }

        default: {
            return state;
        }
    }
}


export const getFoundPosts = (searchState: SearchState) => searchState.foundPosts;

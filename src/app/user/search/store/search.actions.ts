import { Action } from "@ngrx/store";
import { Post } from "src/app/shared/models/post.model";

export const FOUND_POSTS = '[User] Found Posts';

export class SetFoundPosts implements Action {
    readonly type = FOUND_POSTS;
    constructor(public foundPosts: Post[]) { }
}

export type SearchActions = SetFoundPosts

import { Action } from "@ngrx/store";
import { Post } from "src/app/shared/models/post.model";

export const POSTS = '[User] Posts';

export class SetPosts implements Action {
    readonly type = POSTS;
    constructor(public posts: Post[][]) { }
}

export type UserActions = SetPosts

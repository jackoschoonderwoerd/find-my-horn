import { Saxophone } from "./saxophone.model";

export interface Post {
    id?: string;
    datePosted: Date;
    saxophone: Saxophone;
    ownerId?: string;
    dateOfPurchase?: Date;
    comment: string
}

export interface PostDateToAny {
    id?: string;
    datePosted: any;
    saxophone: Saxophone;
    ownerId?: string;
    dateOfPurchase?: any;
    comment: string;
}

export interface CombinedPosts {
    combinedPosts: Post[][];
}

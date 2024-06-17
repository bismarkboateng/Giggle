
type CreatUserParams = {
    username: string;
    email: string;
    authId: string;
}

type Meme = {
    _id: string;
    file?: string;
    caption?: string;
    likes?: number;
    upvotes?: number;
    downvotes?: number;
    views?: number;
    commentId?: string;
    authorId: string;
    tag?: string;
    date?: Date;
}

type UserFromDb = {
    _id: string;
    username: string;
    email: string;
    rank: string;
    total_likes: number;
    total_upvotes: number;
    authId: string;
}

type UpdateUserParams = {
    username: string;
    email: string;
}

type MemeDetail = {
    _id: string;
    file: string;
    likes: number;
    upvotes: number;
    downvotes: number;
    views: number;
    authorId: {
        _id: string;
        username: string;
    };
    tag: string;
    date: string;
}

type Comment = {
    _id: string;
    content: string;
    memeId: string;
    commentorId: {
        username: string;
    };
    date: string;
}



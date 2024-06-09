
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
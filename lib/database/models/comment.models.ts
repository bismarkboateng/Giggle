import { Schema, Types, model, models } from "mongoose";

const CommentSchema = new Schema({
    content: { type: String, required: true },
    memeId: { type: Types.ObjectId, ref: "Meme" },
    commentorId: { type: Types.ObjectId, ref: "User" },
    date: { type: Date, default: Date.now() }
})

const Comment = models.Comment || model("Comment", CommentSchema)
export default Comment
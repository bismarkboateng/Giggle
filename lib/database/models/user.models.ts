import { Schema, model, models } from "mongoose"

const UserSchema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    image: { type: String, required: false },
    rank: { type: String, default: "Novice", required: false },
    total_likes: { type: Number, default: 0, required: false },
    total_upvotes: { type: Number, default: 0, required: false },
    authId: { type: String, required: true },
})

const User = models.User || model("User", UserSchema)
export default User
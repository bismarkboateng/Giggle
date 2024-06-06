import { Schema, model, models } from "mongoose";

const TagSchema = new Schema({
    name: { type: String, required: true },
})

const Tag = models.Tag || model("Tag", TagSchema)
export default Tag
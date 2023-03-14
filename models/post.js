import mongoose from "mongoose";

const Schema = mongoose.Schema

const commentSchema = new Schema ({
  text: String,
  author: {type: Schema.Types.ObjectId, ref: 'Profile'}
},{
  timestamps: true
})

const postSchema = new Schema({
  question: String,
  elaboration: String,
  comment: [commentSchema],
  poster: {type: Schema.Types.ObjectId, ref: 'Profile'}
})

const Post = mongoose.model('Post', postSchema)

export{
  Post
}
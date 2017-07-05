import mongoose from './mongoose'

let Schema = mongoose.Schema

let ObjectId = Schema.Types.ObjectId

let photoSchema = new Schema({
  title: {
    type: String,
    default: ''
  },
  links: {
    type: String
  },
  color: {
    type: String
  },
  exif: {
    type: Object
  },
  width: {
    type: String
  },
  height: {
    type: String
  },
  tags: {
    type: Object
  },
  user: {
    type: ObjectId,
    ref: 'user'
  },
  description: {    // 简介
    type: String,
    default: '这个人很懒，啥也没留下。。。'
  },
  created_at: {
    type: Date,
    default: Date.now
  }
})

let photo = mongoose.model('photo', photoSchema)
export default photo

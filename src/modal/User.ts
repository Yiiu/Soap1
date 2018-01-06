import mongoose from './mongoose'

const Schema = mongoose.Schema

const ObjectId = Schema.Types.ObjectId

const userSchema = new Schema({
  nickname: {
    type: String,
    default: null
  },
  // 密码加密
  hash: {
    type: String,
    default: null
  },
  salt: {
    type: String,
    default: null
  },
  login_at: {
    type: Date,
    default: Date.now
  },
  username: {
    type: String,
    unique: true
  },
  email: {
    type: String,
    default: null
  },
  description: {    // 简介
    type: String,
    default: '这个人很懒，啥也没留下。。。'
  },
  avatar: {
    type: String,
    default: null
  },
  cover: {
    type: String,
    default: null
  },
  like: {
    type: Number,
    default: 0
  },
  likeSchema: {
    type: ObjectId,
    ref: 'like'
  },
  followers: {
    type: Number,
    default: 0
  },
  following: {
    type: Number,
    default: 0
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  },
  website: {
    type: Date,
    default: null
  },
  location: {
    type: String,
    default: null
  },
  photos: {
    type: Number,
    default: 0
  }
}, {
  toJSON: {
    virtuals: true
  }
})

const user = mongoose.model('user', userSchema)
export default user

import mongoose from './mongoose'
import { Document, Model } from 'mongoose'
import {
  User as oauthUser
} from 'oauth2-server'

import Plugins, {
  PluginsType
} from '../plugins/User'

const Schema = mongoose.Schema

const ObjectId = Schema.Types.ObjectId

export interface UserInterface {
  [key: string]: any
}

export interface User extends oauthUser, Document {
  id: string
  grants?: string[]
  age?: number
  name?: string
  create?: Date
  description?: string
}

export interface UserModel extends Model<User>, PluginsType {}

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

userSchema.plugin(Plugins)

const user = mongoose.model<User>('user', userSchema) as UserModel
export default user

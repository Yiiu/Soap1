import {Schema} from 'mongoose'
import * as crypto from 'crypto'

import {
  ApiError
} from '../util'

import { User } from '../model'

export interface PluginsType {
  signup: (user: object, pwd: string) => void
}

export default function (schema: Schema) {
  schema.statics.signup = async function (user, pwd) {
    if (!(user in this)) {
      user = new this(user)
    }
    const userByName  = await this.findOne({ username: user.username })
    const userByEmail  = await this.findOne({ email: user.email })
    if (userByName) {
      throw new ApiError(400, 'exist_username')
    }
    if (userByEmail) {
      throw new ApiError(400, 'exist_email')
    }
    return await user.setPassword(user, pwd)
  }
  schema.methods.setPassword = async (user, pwd) => {
    // 生成随机数
    const salt = await crypto.randomBytes(32).toString('hex')
    const hash = await crypto.pbkdf2Sync(pwd, salt, 23333, 32, 'sha512').toString('hex')
    user.salt = salt
    user.hash = hash
    // user.likeSchema = await Like.create({ user: user._id, photo: [] })
    await user.save()
    return true
  }
}

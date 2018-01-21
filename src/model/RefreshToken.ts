import mongoose from './mongoose'
import { Document, Model } from 'mongoose'
import {
  Token as oauthToken
} from 'oauth2-server'

export interface RefreshToken {
  refreshToken: any
  expires?: Date
  scope?: string
  user: any
  client: any
  [key: string]: any
}

export interface RefreshTokenType extends Document, oauthToken {}

export interface RefreshTokenModel extends Model<RefreshTokenType> {}

const Schema = mongoose.Schema

const ObjectId = Schema.Types.ObjectId

const tokenSchema = new Schema({
  refreshToken: String,
  expires: Date,
  scope: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  client: {
    type: Schema.Types.ObjectId,
    ref: 'client'
  }
}, {
  toJSON: {
    virtuals: true
  }
})

const accessToken = mongoose.model<RefreshTokenType>('refresh_token', tokenSchema) as RefreshTokenModel
export default accessToken

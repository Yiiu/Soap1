import mongoose from './mongoose'
import { Document, Model } from 'mongoose'
import {
  Token as oauthToken
} from 'oauth2-server'

export interface AccessToken {
  accessToken: string
  expires?: Date
  scope?: string
  user: any
  client: any
  [key: string]: any
}

export interface AccessTokenType extends Document, oauthToken {}

export interface AccessTokenModel extends Model<AccessTokenType> {}

const Schema = mongoose.Schema

const ObjectId = Schema.Types.ObjectId

const tokenSchema = new Schema({
  accessToken: String,
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

const accessToken = mongoose.model<AccessTokenType>('access_token', tokenSchema) as AccessTokenModel
export default accessToken

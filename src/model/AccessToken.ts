import mongoose from './mongoose'
import { Document, Model } from 'mongoose'

export interface AccessToken extends Document {
  accessToken: string
  expires?: Date
  scope?: string
  user: any
  client: any
  [key: string]: any
}

export interface AccessTokenModel extends Model<AccessToken> {}

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

const accessToken = mongoose.model<AccessToken>('access_token', tokenSchema) as AccessTokenModel
export default accessToken

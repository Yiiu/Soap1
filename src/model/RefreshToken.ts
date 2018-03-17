import mongoose from './mongoose'
import { Document, Model } from 'mongoose'

export interface RefreshToken {
  refreshToken?: any
  expires?: Date
  scope?: string
  user: any
  client: any
  [key: string]: any
}

export interface RefreshTokenDocument extends RefreshToken, Document {}

export interface RefreshTokenModel extends Model<RefreshTokenDocument> {}

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

const refreshToken = mongoose.model<RefreshTokenDocument>('refresh_token', tokenSchema) as RefreshTokenModel
export default refreshToken

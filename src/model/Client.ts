import mongoose from './mongoose'
import { Document } from 'mongoose';
import {
  Client as oauthClient
} from 'oauth2-server'

export interface Client extends oauthClient, Document {
  id: string
  grants: string[]
}

const Schema = mongoose.Schema

const ObjectId = Schema.Types.ObjectId
const clientSchema = new Schema({
  client_name: String,
  client_secret: String,
  client_id: String,
  grant_types: String,
  grants: Array,
  redirect_uri: String,
  id: String,
}, {
  toJSON: {
    virtuals: true
  }
})

const client = mongoose.model<Client>('client', clientSchema)
export default client

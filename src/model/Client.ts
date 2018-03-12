import mongoose from './mongoose'
import { Document } from 'mongoose';

export interface Client {
  _id: any;
  client_name: string
  client_secret: string
  client_id: string
  grant_types: string
  grants: string[]
  redirect_uri: string
}

export interface ClientModel extends Client, Document {}

const Schema = mongoose.Schema

const ObjectId = Schema.Types.ObjectId
const clientSchema = new Schema({
  client_name: String,
  client_secret: String,
  client_id: String,
  grant_types: String,
  grants: Array,
  redirect_uri: String
}, {
  toJSON: {
    virtuals: true
  }
})

const client = mongoose.model<ClientModel>('client', clientSchema)
export default client

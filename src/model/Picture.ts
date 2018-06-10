import mongoose from './mongoose'
import { Document } from 'mongoose';

export interface Picture {
  _id: any;
  created_at: Date
  updated_at: Date
  location: any
  description: string
  info: string
  exif: any
  key: string
  user: any
  views: number
  likes: number
  size: number
  mimetype: string
  width: number
  height: number
}

export interface PictureModel extends Picture, Document {}

const Schema = mongoose.Schema

const ObjectId = Schema.Types.ObjectId
const pictureSchema = new Schema({
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  },
  description: {
    type: String,
    default: ''
  },
  title: {
    type: String,
    default: ''
  },
  info: {
    type: Object,
    default: {}
  },
  size: {
    type: Number
  },
  mimetype: {
    type: String
  },
  exif: {
    type: Object
  },
  location: {
    type: Object,
    default: null
  },
  user: {
    type: ObjectId,
    ref: 'user'
  },
  views: {
    type: Number,
    default: 0
  },
  likes: {
    type: Number,
    default: 0
  },
  width: Number,
  height: Number,
  hash: String,
  key: String
}, {
  toJSON: {
    virtuals: true
  }
})

const picture = mongoose.model<PictureModel>('picture', pictureSchema)
export default picture

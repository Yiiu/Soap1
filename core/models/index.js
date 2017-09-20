import mongoose from 'mongoose'
import { mongo as config } from 'config'

import User from './user'
import Photo from './photo'
import Like from './like'

export function models (req, res, next) {
  req.models = {
    User,
    Photo,
    Like
  }
  next()
}

export {
  User,
  Photo,
  Like
}

export default async () => {
  return await mongoose.connect(
    config.url,
    {
      useMongoClient: true
    }
  )
}

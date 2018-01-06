import * as mongoose from 'mongoose'
import config from '../config'

export default async () => {
  return await mongoose.connect(
    config.mongodb.url
  )
}

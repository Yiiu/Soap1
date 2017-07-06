import mongoose from 'mongoose'
import { mongo as config } from '../../config'

export { default as User } from './user'
export { default as Photo } from './photo'

export default async () => {
  return await mongoose.connect(`mongodb://${config.username}:${config.pwd}@${config.host}:${config.port}/${config.db}`)
}

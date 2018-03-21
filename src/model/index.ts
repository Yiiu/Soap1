import * as mongoose from 'mongoose'
import config from '../config'

import Client from './Client.js'
import User from './User'
import AccessToken from './AccessToken'
import Picture from './Picture'

export default async () => {
  return await mongoose.connect(
    config.mongodb.url
  )
}

export {
  User,
  Client,
  AccessToken,
  Picture
}

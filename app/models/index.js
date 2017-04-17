import mongoose from 'mongoose'
import config from '../../config/mongodb'

mongoose.connect(`mongodb://${config.username}:${config.pwd}@${config.host}:${config.port}/${config.db}`)

let db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', async () => {
    console.log('MongoDB Opened!')
})

export { default as User } from './user'
import mongoose from './mongoose'

let Schema = mongoose.Schema

let ObjectId = Schema.Types.ObjectId

let photoSchema = new Schema({
  links: {
    type: String
  },
  color: {
    type: String
  },
  exif: {
    type: Object
  },
  gps: {
    type: Object
  },
  width: {
    type: Number,
    default: 0
  },
  height: {
    type: Number,
    default: 0
  },
  tags: [{
    type: Object
  }],
  user: {
    type: ObjectId,
    ref: 'user'
  },
  created_at: {
    type: Date,
    default: Date.now
  }
})

let photo = mongoose.model('photo', photoSchema)
export default photo

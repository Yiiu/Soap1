import mongoose from './mongoose'
import Plugins from 'core/plugins/photo'

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
  size: {
    type: Number
  },
  like: {
    type: Number,
    default: 0
  },
  originalname: {
    type: String
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
}, {
  toJson: {
    virtuals: true
  }
})

photoSchema.plugin(Plugins)

let photo = mongoose.model('photo', photoSchema)
export default photo

import mongoose from './mongoose'
import Plugins from 'core/plugins/like'

let Schema = mongoose.Schema

let ObjectId = Schema.Types.ObjectId

let likeSchema = new Schema({
  user: {
    type: ObjectId,
    ref: 'user'
  },
  photos: [{
    type: ObjectId,
    ref: 'photo'
  }]
}, {
  toJson: {
    virtuals: true
  }
})
likeSchema.plugin(Plugins)

let like = mongoose.model('like', likeSchema)
export default like

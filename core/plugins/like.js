import { Like, User } from 'core/models'

export default function (schema) {
  schema.statics.getPhotos = async function (userId) {
    return await Like
      .findOne({ user: userId })
      .sort('created_at')
      .populate({ path: 'user', select: User.select })
      .populate({ path: 'photo' })
  }
}

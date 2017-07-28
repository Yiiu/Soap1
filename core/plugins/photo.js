import { Photo, User } from 'core/models'

export default function (schema) {
  schema.statics.getPhotos = async function (id) {
    let info
    if (id) {
      info = await Photo
        .find({ user: id })
        .sort('created_at')
        .populate({ path: 'user', select: User.select })
    } else {
      info = await Photo
        .find()
        .sort('_id')
        .populate({ path: 'user', select: User.select })
    }
    return info
  }
}

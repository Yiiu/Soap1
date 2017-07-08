import { User, Photo } from 'core/models'

export default function (schema) {
  schema.statics.getNewPhotos = async function (id) {
    let info = await Photo
      .find()
      .sort('_id')
      .populate({ path: 'user', select: userSelect })
    return info
  }
}

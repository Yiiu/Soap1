import { Photo } from 'core/models'

let userSelect = 'nickname username description avatar followers following website location photos'
export default function (schema) {
  schema.statics.getNewPhotos = async function () {
    let info = await Photo
      .find()
      .sort('_id')
      .populate({ path: 'user', select: userSelect })
    return info
  }
}

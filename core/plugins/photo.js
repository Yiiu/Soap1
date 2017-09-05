import { Photo, User, Like } from 'core/models'

export default function (schema) {
  schema.statics.getPhotoList = async function (userId, params = {}) {
    let info = await Photo
      .find({ ...params })
      .sort('_id')
      .populate({ path: 'user', select: User.select })
      .lean()
    for (let i in info) {
      let isLike = await Photo.getUserIsLike(info[i]._id, userId)
      info[i].is_like = isLike
    }
    return info
  }
  schema.statics.getPhotoInfo = async function (photoId) {
    return await Photo
      .findById(photoId)
      .sort('created_at')
      .populate({ path: 'user', select: User.select })
      .lean()
  }
  schema.statics.getUserIsLike = async function (photoId, userId) {
    let isLike = await Like.find({user: userId, photos: { $in: [photoId] }})
    return !!isLike[0]
  }
  schema.statics.getPhotoLikeCount = async function (photoId) {
    return await Like
      .count({ photos: { $in: [photoId] } })
  }
}

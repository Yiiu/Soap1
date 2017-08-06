import { Photo, User, Like } from 'core/models'

export default function (schema) {
  schema.statics.getPhotoList = async function (userId, id) {
    let info
    if (userId) {
      info = await Photo
        .find({ user: userId })
        .sort('created_at')
        .populate({ path: 'user', select: User.select })
        .lean()
    } else {
      info = await Photo
        .find()
        .sort('_id')
        .populate({ path: 'user', select: User.select })
        .lean()
    }
    for (let i in info) {
      let isLike = await Like.getUserIsLike(info[i]._id, id)
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

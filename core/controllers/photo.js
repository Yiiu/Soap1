import { ApiError } from 'core/util'
import { User, Photo, Like } from 'core/models'

export const getPhotoList = async (req, res, next) => {
  try {
    let { type } = req.query
    if (!type) type = 'new'
    let data = await Photo.getPhotos()
    res.json(data)
  } catch (error) {
    next(error)
  }
}

export const addPhoto = async (req, res, next) => {
  try {
    const { user, photoInfo} = req
    if (!photoInfo) {
      throw new ApiError(400, 'error_download')
    }
    let photo = await new Photo({ ...photoInfo, user: user._id}).save()
    await User.update({
      _id: user._id
    }, {
      $inc: { photos: 1 }
    })
    res.json(photo)
  } catch (error) {
    next(error)
  }
}

export const likePhoto = async (req, res, next) => {
  try {
    const { params, user } = req
    if (params.photoId) {
      Promise.all([
        await Like.update({
          user: user._id
        }, {
          $push: { photos: params.photoId }
        }),
        await User.update({
          _id: user._id
        }, {
          $inc: { like: 1 }
        })
      ])
      return res.json({
        message: 'ok'
      })
    } else {
      throw 'no_userId'
    }
  } catch (error) {
    next(error)
  }
}
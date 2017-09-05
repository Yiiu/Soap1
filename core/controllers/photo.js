import { ApiError } from 'core/util'
import { getExif, uploadQnImage } from 'core/util'
import fs from 'fs'
import path from 'path'
import exif from 'core/util/exif'
import ofSize from 'image-size'

export const getPhotoList = async (req, res, next) => {
  try {
    const { Photo } = req.models
    let { type } = req.query
    if (!type) type = 'new'
    let data = await Photo.getPhotoList(req.user._id)
    res.json(data)
  } catch (error) {
    next(error)
  }
}

export const addPhoto = async (req, res, next) => {
  try {
    const { file, user } = req
    const { User, Photo } = req.models
    if (!file) {
      return next('no_image')
    }
    const filePath = file.path
    let data = await fs.createReadStream(filePath)
    const size = ofSize(filePath)
    const exifInfo = await getExif(filePath)
    let { url } = await uploadQnImage(data)
    let images = {
      mimetype: file.type,
      width: size.width,
      height: size.height,
      links: `//${url}`,
      size: file.sizem,
      originalname: file.originalname
    }
    if (exifInfo){
      let { exif, image, gps} = exifInfo
      images.exif = {
        aperture: exif.FNumber && exif.FNumber[0] / exif.FNumber[1],
        exposure_time: exif.ExposureTime && `${exif.ExposureTime[0]}/${exif.ExposureTime[1]}`,
        iso: exif.ISO,
        create_date: exif.CreateDate,
        make: image.Make,
        model: image.Model,
        exposure_program: exif.ExposureProgram,
        focal_length: exif.FocalLength && exif.FocalLength[0] / exif.FocalLength[1],
        exposure_mode: exif.ExposureMode,
        white_balance: exif.WhiteBalance
      },
      images.gps = gps
    }
    let photo = await new Photo({ ...images, user: user._id}).save()
    await User.update({
      _id: user._id
    }, {
      $inc: { photos: 1 }
    })
    res.json({
      message: 'ok'
    })
  } catch (error) {
    next(error)
  }
}

export const likePhoto = async (req, res, next) => {
  try {
    const { params, user } = req
    const { User, Photo, Like } = req.models
    const { action } = req.query
    let isLike = await Photo.getUserIsLike(params.photoId, user._id)
    if (!isLike) {
      Promise.all([
        await Like.update({
          user: user._id
        }, {
          $addToSet: { photos: params.photoId }
        }),
        await User.update({
          _id: user._id
        }, {
          $inc: { like: 1 }
        }),
        await Photo.update({
          _id: params.photoId
        }, {
          $inc: { like: 1 }
        })
      ])
      let photoInfo = await Photo
        .findById(params.photoId)
        .populate({ path: 'user', select: User.select })
        .lean()
      photoInfo.is_like = Photo.getUserIsLike(photoInfo._id, user._id)
    } else {
      throw new ApiError(400, 'already_like')
    }
  } catch (error) {
    next(error)
  }
}

export const getPhotoInfo = async (req, res, next) => {
  try {
    const { Photo } = req.models
    let { photoId } = req.params
    let data = await Photo.getPhotoInfo(photoId)
    res.json(data)
  } catch (error) {
    next(error)
  }
}

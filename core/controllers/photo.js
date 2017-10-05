import { ApiError } from 'core/util'
import { getExif, uploadQnImage } from 'core/util'
import fs from 'fs'
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
    let exifInfo = {}
    try {
      let info = await getExif(filePath)
      let { exif, image, gps} = info
      exifInfo = {
        exif: {
          make: image.Make,
          model: image.Model,
          aperture: exif.FNumber && exif.FNumber[0] / exif.FNumber[1],
          exposure_time: exif.ExposureTime && `${exif.ExposureTime[0]}/${exif.ExposureTime[1]}`,
          iso: exif.ISO,
          create_date: exif.CreateDate,
          exposure_program: exif.ExposureProgram,
          focal_length: exif.FocalLength && exif.FocalLength[0] / exif.FocalLength[1],
          exposure_mode: exif.ExposureMode,
          white_balance: exif.WhiteBalance
        },
        gps: gps
      }
    } catch (err) {
      exifInfo = {}
    }
    let { url } = await uploadQnImage(data)
    let images = {
      mimetype: file.type,
      width: size.width,
      height: size.height,
      links: `//${url}`,
      size: file.sizem,
      originalname: file.originalname
    }
    await new Photo({ ...exifInfo, ...images, user: user._id}).save()
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
    const { unlike } = req.query
    let isLike = await Photo.getUserIsLike(params.photoId, user._id)
    if (isLike && !unlike) {
      throw 'err'
    } else if (!isLike && unlike) {
      throw 'err'
    }
    Promise.all([
      await Like.update({
        user: user._id
      }, {
        [unlike ? '$unset' : '$addToSet']: { photos: params.photoId }
      }),
      await User.update({
        _id: user._id
      }, {
        $inc: { like: unlike ? -1 : 1 }
      }),
      await Photo.update({
        _id: params.photoId
      }, {
        $inc: { like: unlike ? -1 : 1 }
      })
    ])
    let photoInfo = await Photo
      .findById(params.photoId)
      .populate({ path: 'user', select: User.select })
      .lean()
    photoInfo.is_like = await Photo.getUserIsLike(photoInfo._id, user._id)
    return res.json(photoInfo)
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

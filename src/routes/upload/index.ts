import * as express from 'express'
import * as sharp from 'sharp'
import * as exifInfo from 'exif-reader'

import { isAuthenticated } from '../../middleware/account'
import upload from '../../middleware/upload'
import { qiniuUpload } from '../../middleware/qiniu'
import { Picture } from '../../model'

const router = express.Router()

router.post('/', isAuthenticated, upload.single('photo'), qiniuUpload(), async (req, res, next) => {
  const metadata = await sharp(req.file.path).metadata()
  const data = {
    hash: req.file.hash,
    info: {
      format: metadata.format,
      mimetype: req.file.mimetype,
      size: req.file.size,
      width: metadata.width,
      height: metadata.height,
    },
    user: req.auth._id,
    key: req.file.key,
    exif: null,
    location: null
  }
  if (metadata.exif) {
    const exif = exifInfo(metadata.exif)
    data.exif = {
      make: exif.image.Make,
      model: exif.image.Model,
      exposure_time: exif.exif.ExposureTime,
      aperture: exif.exif.FNumber,
      ios: exif.exif.ISO,
      date_time_original: exif.exif.DateTimeOriginal,
      flash: exif.exif.Flash,
      focal_length: exif.exif.FocalLength
    }
    if (exif.gps) {
      data.location = {
        latitude: exif.gps.GPSLatitude,
        longitude: exif.gps.GPSLongitude
      }
    }
  }
  const newPicture = await new Picture(data).save()
  return res.json({
    message: 'ok'
  })
});

export default router

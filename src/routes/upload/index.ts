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
    user: req.auth.user._id,
    key: req.file.key,
    exif: null,
    location: null
  }
  if (metadata.exif) {
    const exif = exifInfo(metadata.exif)
    data.exif = {}
    if (exif.exif) {
       data.exif.exposure_time = exif.exif.ExposureTime,
       data.exif.aperture = exif.exif.FNumber,
       data.exif.ios = exif.exif.ISO,
       data.exif.date_time_original = exif.exif.DateTimeOriginal,
       data.exif.flash = exif.exif.Flash,
       data.exif.focal_length = exif.exif.FocalLength
    }
    if (exif.gps) {
      data.location = {
        latitude: exif.gps.GPSLatitude,
        longitude: exif.gps.GPSLongitude
      }
    }
    data.exif.make = exif.image.Make,
    data.exif.model = exif.image.Model
  }
  const newPicture = await new Picture(data).save()
  return res.json({
    message: 'ok'
  })
});

export default router

import express from 'express'
import multer from 'multer'
import exif from 'exif'

import { Photo } from 'core/models'
import { isUserLogger, uploadImage } from 'core/middleware'

const ExifImage = exif.ExifImage

const router = express.Router()
const storage = multer.memoryStorage()

const upload = multer({
  storage: storage,
  fileFilter: function(req, files, callback) {
    var type = '|' + files.mimetype.slice(files.mimetype.lastIndexOf('/') + 1) + '|'
    var fileTypeValid = '|jpg|png|jpeg|gif|'.indexOf(type) !== -1
    if (fileTypeValid) {
      callback(null, true)
    } else {
      callback(new Error('invalid_imagetype'))
    }
    callback(null, !!fileTypeValid)
  }
})

router.post('/', isUserLogger, upload.single('image'), async function (req, res, next) {
  try {
    let imageInfo
    ExifImage({ image : req.file.buffer }, (err, obj) => {
      if (err) {
        throw err
      }
      imageInfo = obj
    })
    if (req.file && req.file.buffer) {
      let info = await uploadImage(req.file.buffer)
      let photo = await new Photo({
        links: `//${info.url}`,
        exif: imageInfo.exif,
        image: imageInfo.image,
        user: req.userInfo._id
      })
      let photoSave = await Photo.create(photo)
      res.json(photoSave)
    } else {
      throw new Error('no_image')
    }
  } catch (err) {
    next(err)
  }
})

export default router

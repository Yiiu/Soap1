import express from 'express'
import multer from 'multer'
import bytes from 'bytes'
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
    console.log(type)
    var fileTypeValid = '|jpg|png|jpeg|gif|arw|'.indexOf(type) !== -1
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
      res.json(photo)
    } else {
      throw new Error('no_image')
    }
  } catch (err) {
    next(err)
  }
})

export default router

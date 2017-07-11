import uid from 'uid-safe'
import qn from 'qn'
import config from 'config'
import multer from 'multer'
import exif from 'exif'
import pify from'pify'

const ExifImage = exif.ExifImage

const storage = multer.memoryStorage()

const upload = pify(
  multer({
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
  }).single('image')
)

export async function addPhoto (req, res, next) {
  try {
    await upload(req, res)
    if (!req.file || !req.file.buffer) {
      return next('no_image')
    }
    let imageInfo
    new ExifImage({ image : req.file.buffer }, (err, obj) => {
      if (err) {
        throw err
      }
      imageInfo = obj
    })
    let info = await uploadImage(req.file.buffer)
    let photo = {
      image: info,
      exif: imageInfo
    }
    req.photoInfo = photo
    next()
  } catch (err) {
    next(err)
  }
}
export async function uploadImage (file) {
  return new Promise(async (resolve, reject) => {
    let client = qn.create(config.qn)
    client.upload(file, {
      key: await uid(18)
    }, (err, result) => {
      if (err) {
        return reject(err)
      }
      return resolve(result)
    })
  })
}

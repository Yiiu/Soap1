import uid from 'uid-safe'
import qn from 'qn'
import config from 'config'
import multer from 'multer'
import pify from'pify'
import exif from 'core/util/exif'
import ofType from 'image-type'
import ofSize from 'image-size'

let ExifImage = pify(exif.ExifImage)

const storage = multer.memoryStorage()

async function getExif (buffer) {
  try {
    let exif = await ExifImage({ image: buffer })
    return exif
  } catch (error) {
    return null
  }
}

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

export async function uploadPhoto (req, res, next) {
  try {
    await upload(req, res)
    if (!req.file || !req.file.buffer) {
      return next('no_image')
    }
    let type = ofType(req.file.buffer)
    let size = ofSize(req.file.buffer)
    let { url } = await uploadImage(req.file.buffer)
    let images = {
      mimetype: type.mime,
      width: size.width,
      height: size.height,
      links: `//${url}`
    }
    let exifInfo = await getExif(req.file.buffer)
    if (exifInfo){
      let { exif, image, gps} = exifInfo
      images.exif = {
        aperture: exif.FNumber && exif.FNumber[0] / exif.FNumber[1],
        exposure_time: exif.ExposureTime && `${exif.ExposureTime[0]/10}/${exif.ExposureTime[1]/10}`,
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
    req.photoInfo = images
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

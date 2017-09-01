import uid from 'uid-safe'
import qn from 'qn'
import config from 'config'
import multer from 'multer'
import pify from'pify'
import exif from 'core/util/exif'
import ofType from 'image-type'
import ofSize from 'image-size'
import fs from 'fs'
import path from 'path'

let ExifImage = pify(exif.ExifImage)
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname, `../../uploads`))
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname + '-' + Date.now())
  }
})

async function getExif (buffer) {
  try {
    let exif = await ExifImage({ image: buffer })
    return exif
  } catch (error) {
    return null
  }
}

export const multerUpload = multer({
  storage: storage,
  fileFilter: function(req, files, callback) {
    console.log(files)
    var type = '|' + files.mimetype.slice(files.mimetype.lastIndexOf('/') + 1) + '|'
    var fileTypeValid = '|jpg|png|jpeg|'.indexOf(type) !== -1
    if (fileTypeValid) {
      callback(null, true)
    } else {
      callback(new Error('invalid_imagetype'))
    }
    callback(null, !!fileTypeValid)
  }
})

export async function uploadPhoto (req, res, next) {
  try {
    // const file = req.file
    // if (!file) {
    //   return next('no_image')
    // }
    // const filePath = path.resolve(__dirname, `../../${file.path}`)
    // let data = await fs.createReadStream(filePath)
    // const size = ofSize(filePath)
    // const exifInfo = await getExif(filePath)
    // let { url } = await uploadImage(data)
    // let images = {
    //   mimetype: size.type,
    //   width: size.width,
    //   height: size.height,
    //   links: `//${url}`
    // }
    // if (exifInfo){
    //   let { exif, image, gps} = exifInfo
    //   images.exif = {
    //     aperture: exif.FNumber && exif.FNumber[0] / exif.FNumber[1],
    //     exposure_time: exif.ExposureTime && `${exif.ExposureTime[0]}/${exif.ExposureTime[1]}`,
    //     iso: exif.ISO,
    //     create_date: exif.CreateDate,
    //     make: image.Make,
    //     model: image.Model,
    //     exposure_program: exif.ExposureProgram,
    //     focal_length: exif.FocalLength && exif.FocalLength[0] / exif.FocalLength[1],
    //     exposure_mode: exif.ExposureMode,
    //     white_balance: exif.WhiteBalance
    //   },
    //   images.gps = gps
    // }
    // req.photoInfo = images
    // fs.unlinkSync(filePath)
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

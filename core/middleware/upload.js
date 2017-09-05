
import qn from 'qn'
import path from 'path'
import multer from 'multer'
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname, `../../uploads`))
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname + '-' + Date.now())
  }
})


export const multerUpload = multer({
  storage: storage,
  fileFilter: function(req, files, callback) {
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
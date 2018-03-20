import * as multer from 'multer'
import * as path from 'path'
import * as crypto from 'crypto'
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve(__dirname, `../../../uploads`))
  },
  filename: async (req, file, cb) => {
    const salt = await crypto.randomBytes(16).toString('hex')
    cb(null, salt)
  }
})

const config = {
  storage: storage
}

export default multer(config)
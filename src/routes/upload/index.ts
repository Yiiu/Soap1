import * as express from 'express'
import * as sharp from 'sharp'

import { isAuthenticated } from '../../middleware/account'
import upload from '../../middleware/upload'
import { qiniuUpload } from '../../middleware/qiniu'
// import { User } from '../../model'

const router = express.Router()

router.post('/', isAuthenticated, upload.single('photo'), qiniuUpload(), async (req, res, next) => {
  console.log(req.file)
  const data = sharp(req.file.path).metadata()
  .then((metadata) => {
    console.log(metadata.exif)
  })
});

export default router

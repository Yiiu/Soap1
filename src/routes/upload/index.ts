import * as express from 'express'

import { isAuthenticated } from '../../middleware/account'
import upload from '../../middleware/upload'
import { qiniuUpload } from '../../middleware/qiniu'
// import { User } from '../../model'

const router = express.Router()

router.post('/', isAuthenticated, upload.single('photo'), qiniuUpload(), async (req, res, next) => {
  console.log(req.file)
});

export default router

import express from 'express'
import uid from 'uid-safe'
import { isAuthenticated } from 'core/middleware'
import multer from 'multer'
import bytes from 'bytes'
import qn from 'qn'
import config from 'config'
import signature from 'cookie-signature'
const router = express.Router()
const storage = multer.memoryStorage()

const upload = multer({
  storage: storage
})

router.post('/', upload.single('image'), async function(req, res, next) {
  if (req.file && req.file.buffer) {
    console.log(req.file)
    // 上传到七牛
    let client = qn.create(config.qn)
    client.upload(req.file.buffer, {
      key: await uid(18)
    }, function(err, result) {
      console.log(err, result)
      if (err) {
        return res.json({
          code: 1,
          msg: '上传失败！',
          data: {
            src: ''
          }
        })
      }
      res.json({
        code: 0,
        msg: '上传成功！',
        data: {
          src: result.url + '?imageslim'
        }
      })
    })
  }
})

export default router

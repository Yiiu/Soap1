import express from 'express'
import inspectorObject from './schema'
import { inspector } from 'core/middleware'
import { getPhotoList, addPhoto, likePhoto, getPhotoInfo } from 'core/controllers'
import { isAuthenticated, uploadPhoto, multerUpload } from 'core/middleware'

const router = express.Router()

router
  .use(isAuthenticated)
  .get('/photos', getPhotoList)
  .get('/photos/:photoId', getPhotoInfo)
  .post('/photos', multerUpload.single('photo'), (req, res, next) => {
    const { info } = req.body
    req.body = {
      ...req.body,
      ...JSON.parse(info)
    }
    inspector(inspectorObject.upload)(req, res, next)
  }, addPhoto)
  .post('/photos/:photoId/like', likePhoto)

export default router

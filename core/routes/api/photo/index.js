import express from 'express'
import { getPhotoList, addPhoto, likePhoto, getPhotoInfo } from 'core/controllers'
import { isAuthenticated, uploadPhoto } from 'core/middleware'

const router = express.Router()

router
  .use(isAuthenticated)
  .get('/photos', getPhotoList)
  .get('/photos/:photoId', getPhotoInfo)
  .post('/photos', uploadPhoto, addPhoto)
  .post('/photos/:photoId/like', likePhoto)

export default router

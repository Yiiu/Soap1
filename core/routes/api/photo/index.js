import express from 'express'
import { getPhotoList, addPhoto, likePhoto } from 'core/controllers'
import { isAuthenticated, uploadPhoto } from 'core/middleware'

const router = express.Router()

router
  .use(isAuthenticated)
  .get('/photos', getPhotoList)
  .post('/photos', uploadPhoto, addPhoto)
  .post('/photos/:photoId/like', likePhoto)

export default router

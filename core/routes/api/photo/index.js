import express from 'express'
import { getPhotoList, addPhoto, likePhoto, getPhotoInfo } from 'core/controllers'
import { isAuthenticated, uploadPhoto, multerUpload } from 'core/middleware'

const router = express.Router()

router
  .use(isAuthenticated)
  .get('/photos', getPhotoList)
  .get('/photos/:photoId', getPhotoInfo)
  .post('/photos', multerUpload.single('photo'), (req, res) => {
    return res.json({})
  })
  .post('/photos/:photoId/like', likePhoto)

export default router

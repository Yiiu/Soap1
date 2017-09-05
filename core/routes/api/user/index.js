import express from 'express'
import { isAuthenticated } from 'core/middleware'
import { getUserInfo, getUserPhotos, getUserLikePhotos } from 'core/controllers'
const router = express.Router()
router
  .use(isAuthenticated)
  .get('/users/:userId', isQuery, getUserInfo)
  .get('/users/:userId/photos', isQuery, getUserPhotos)
  .get('/users/:userId/likes', isQuery, getUserLikePhotos)
export default router

function isQuery (req, res, next) {
  const { userId } = req.params
  if (!userId) {
    next('exist_username')
  } else {
    next()
  }
}

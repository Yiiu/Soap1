import express from 'express'
import { isAuthenticated } from 'core/middleware'
import { getOneUserInfo, getOneUserPhoto, getUserLikePhoto } from 'core/controllers'
const router = express.Router()
router
  .use(isAuthenticated)
  .get('users')
  .get(/\/user\/@(\w+)/, getOneUserInfo)
  .get('/user/:userId', isQuery, getOneUserInfo)
  .get('/user/:userId/photos', isQuery, getOneUserPhoto)
  .get('/user/:userId/likes', isQuery, getUserLikePhoto)
export default router

function isQuery (req, res, next) {
  const { userId } = req.params
  if (!userId) {
    next('exist_username')
  } else {
    next()
  }
}

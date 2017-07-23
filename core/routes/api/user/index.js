import express from 'express'
import { isAuthenticated } from 'core/middleware'
import { getOneUserInfo, getOneUserPhoto } from 'core/controllers'
const router = express.Router()
router
  .use(isAuthenticated)
  .get('users')
  .get(/\/user\/@(\w+)/, getOneUserInfo)
  .get('/user/:id', isQuery, getOneUserInfo)
  .get('/user/:id/photos', isQuery, getOneUserPhoto)
export default router

function isQuery (req, res, next) {
  const { id } = req.params
  if (!id) {
    next('exist_username')
  } else {
    next()
  }
}

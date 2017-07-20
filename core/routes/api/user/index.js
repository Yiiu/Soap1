import express from 'express'
import { isAuthenticated } from 'core/middleware'
const router = express.Router()
import { User } from 'core/models'

router
  .use(isAuthenticated)
  .get('users')
  .get('/user/:id', isQuery, async (req, res, next) => {
    try {
      const { id } = req.params
      let userInfo
      if (id === 'me') {
        const { userId } = req.session
        userInfo = await User.getUserInfo(userId)
      } else {
        userInfo = await User.getUserInfo(id)
      }
      res.json(userInfo)
    } catch (error) {
      next(error)
    }
  })
  .get('/user/:id/photos', isQuery, async (req, res, next) => {
    try {
      const { id } = req.params
      let userInfo
      if (id === 'me') {
        const { userId } = req.session
        userInfo = await User.getUserPhotos(userId)
      } else {
        userInfo = await User.getUserPhotos(id)
      }
      res.json(userInfo)
    } catch (error) {
      next(error)
    }
  })
export default router

function isQuery (req, res, next) {
  const { id } = req.params
  if (!id) {
    next('exist_username')
  } else {
    next()
  }
}

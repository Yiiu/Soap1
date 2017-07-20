import express from 'express'
import { isUserLogger } from 'core/middleware'
const router = express.Router()
import { User } from 'core/models'

router
  .use(isUserLogger)
  .get('users')
  .get('/user/:id', isQuery, async (req, res, next) => {
    try {
      const { id } = req.params
      let userInfo
      if (id === 'me') {
        const { _id } = req.user
        userInfo = await User.getUserInfo(_id)
      } else {
        userInfo = await User.getUserInfo(id.match(/^\@(\w+)/)[1])
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
        const { _id } = req.user
        userInfo = await User.getUserPhotos(_id)
      } else {
        userInfo = await User.getUserPhotos(id.match(/^\@(\w+)/)[1])
      }
      res.json(userInfo)
    } catch (error) {
      next(error)
    }
  })
export default router

function isQuery (req, res, next) {
  const { id } = req.params
  if (id && (/^\@/.test(id) || id === 'me')) {
    next()
  } else {
    next('exist_username')
  }
}

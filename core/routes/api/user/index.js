import express from 'express'
import { isAuthenticated } from 'core/middleware'
const router = express.Router()
import { User } from 'core/models'

router.get('/user/:name', isAuthenticated, async (req, res, next) => {
  try {
    const { name } = req.params
    if (name && /^\@/.test(name)) {
      let username = name.match(/^\@(\w+)/)[1]
      let userInfo = await User.getUserInfo(username)
      res.json(userInfo)
    }
  } catch (err) {
    next(err)
  }
})


export default router

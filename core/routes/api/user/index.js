import express from 'express'
import { isAuthenticated } from 'core/middleware'
const router = express.Router()
import { User } from 'core/models'

router.get('/user/info', isAuthenticated, async (req, res, next) => {
  try {
    let userInfo = await User.fetch(req.userId)
    res.json(userInfo)
  } catch (err) {
    next(err)
  }
})


export default router

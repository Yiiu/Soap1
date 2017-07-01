import express from 'express'
import inspector from './schema'
import { signup, login, logout } from 'core/controllers/accounts'
const router = express.Router()

router.post('/signup', (req, res, next) => {
  try {
    inspector('signup', req.body)
    next()
  } catch (e) {
    return res.status(401).json({
      message: e[0].message
    })
  }
}, signup)

export default router

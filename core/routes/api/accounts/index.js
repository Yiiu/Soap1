import express from 'express'
import inspector from './schema'
import { signup, signin, logout } from 'core/controllers/accounts'
const router = express.Router()

router
  .post('/signup', (req, res, next) => {
    inspector('signup', req.body)
    next()
  }, signup)
  .post('/signin', (req, res, next) => {
    inspector('signin', req.body)
    next()
  }, signin)
  .post('/logout', logout)

export default router

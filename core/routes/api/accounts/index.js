import express from 'express'
import inspector from './schema'
import { signup, token } from 'core/controllers/accounts'
const router = express.Router()

router
  .post('/signup', (req, res, next) => {
    inspector('signup', req.body)
    next()
  }, signup)
  .post('/token', (req, res, next) => {
    req.session.userId = 'test'
    inspector('token', req.body)
    next()
  }, token)

export default router

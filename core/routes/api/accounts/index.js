import express from 'express'
import inspectorObject from './schema'
import { inspector } from 'core/middleware'
import { signup, signin, logout } from 'core/controllers'
const router = express.Router()

router
  .post('/signup', inspector(inspectorObject.signup), signup)
  .post('/signin', inspector(inspectorObject.signin), signin)
  .post('/logout', logout)

export default router

import express from 'express'
import { signup, login, logout, Verify } from '../../controllers/accounts'
const router = express.Router()

router.post('/signup', Verify.signup, signup)
router.post('/signin', Verify.login, login)
router.get('/logout', logout)

export default router

import express from 'express'
import { register, login, logout, Verify } from '../../controllers/accounts'
const router = express.Router()

router.post('/register', Verify.register, register)
router.post('/login', Verify.login, login)
router.get('/logout', logout)

export default router
import express from 'express'
import { register, Verify } from '../../controllers/accounts'
const router = express.Router()

router.post('/register', Verify.register, register)

export default router
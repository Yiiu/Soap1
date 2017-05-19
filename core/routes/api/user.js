/**
 * Created by yuer on 2017/5/18.
 */
import express from 'express'
import User from '../../models/user'
import { getOneUser, tokenUser } from '../../controllers/user'
const router = express.Router()

router.post('/user', User.authenticate, tokenUser)
router.post('/user/:name',  User.authenticate, getOneUser)
export default router
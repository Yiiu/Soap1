/**
 * Created by yuer on 2017/5/18.
 */
import express from 'express'
import { getOneUser } from '../../controllers/user'
const router = express.Router()

router.post('/user/:name',  getOneUser)
export default router
import * as express from 'express'
import account from './accounts'
import oauth from './oauth'

const router = express.Router()

router.use('/accounts', account)
router.use('/oauth', oauth)

export default router

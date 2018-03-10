import * as express from 'express'
import account from './accounts'
import oauth from './oauth'
import user from './user'

const router = express.Router()

router.use('/api/accounts', account)
router.use('/oauth', oauth)
router.use('/api/user', user)

export default router

import accounts from './accounts'
import user from './user'

import express from 'express'

const router = express.Router()
router.use('/', accounts)
router.use('/', user)

export default router

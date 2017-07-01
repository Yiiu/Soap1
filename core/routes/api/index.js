import accounts from './accounts'

import express from 'express'

const router = express.Router()
router.use('/', accounts)

export default router

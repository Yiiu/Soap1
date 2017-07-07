import accounts from './accounts'
import user from './user'
import photo from './photo'

import express from 'express'

const router = express.Router()
router.use('/', accounts)
router.use('/', user)
router.use('/', photo)

export default router

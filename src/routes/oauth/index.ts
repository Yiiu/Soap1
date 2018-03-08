import * as express from 'express'
import { token } from '../../controllers/oauth'

import oauth from '../../oauth'

const router = express.Router()

router.all('/token', token);

export default router

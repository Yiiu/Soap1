import * as express from 'express'

import { isAuthenticated } from '../../middleware/account'
import { getPictureListAll } from '../../controllers/picture'

const router = express.Router()

router.get('/', async (req, res) => {
  const list = await getPictureListAll({})
  return res.json(list)
})

export default router
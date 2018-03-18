import * as express from 'express'

import { isAuthenticated } from '../../middleware/account'

const router = express.Router()

router.get('/:id', isAuthenticated, async (req, res, next) => {
  console.log(req.model.user)
});

export default router

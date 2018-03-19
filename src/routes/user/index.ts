import * as express from 'express'

import { isAuthenticated } from '../../middleware/account'
import { User } from '../../model'

const router = express.Router()

router.get('/me', isAuthenticated, async (req, res, next) => {
  const user = await User.findById(req.auth.user._id).select('-hash -salt')
  res.json(user)
});

export default router

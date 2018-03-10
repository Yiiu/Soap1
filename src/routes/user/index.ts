import * as express from 'express'
import { isAuthenticated } from '../../middleware/account'

const router = express.Router()

router.get('/me', isAuthenticated, async (req, res, next) => {
  console.log(req.auth as any)
});

export default router

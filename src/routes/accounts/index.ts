import * as express from 'express'
import User from '../../model/User'

const router = express.Router()

router.post('/signup', async (req, res, next) => {
  try {
    const { username, email, password } = req.body
    const user = await new User({ username, email })
    await User.signup(user, password)
    res.status(200).json({})
  } catch (error) {
    next(error)
  }
})

export default router

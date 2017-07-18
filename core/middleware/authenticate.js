import jwt from 'jsonwebtoken'
import config from 'config'
import { User } from 'core/models'
export async function isAuthenticated (req, res, next) {
  try {
    const { authorization } = req.headers
    req.user = await jwt.verify(authorization, config.secret).id
    next()
  } catch (err) {
    next(new Error('unauthorized'))
  }
}

export async function isUserLogger (req, res, next) {
  try {
    const { userId } = req.session
    if (!userId) throw 'unauthorized'
    let user = await User.findById(userId)
    if (!user) {
      next('unauthorized')
    } else {
      req.user = user
      next()
    }
  } catch (err) {
    next(err)
  }
}

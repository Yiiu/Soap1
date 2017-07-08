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
    const { authorization } = req.headers
    if (!authorization) throw 'unauthorized'
    let id = await jwt.verify(authorization, config.secret).id
    let user = await User.findById(id)
    if (!user) {
      next(new Error('unauthorized'))
    } else {
      req.user = user
      next()
    }
  } catch (err) {
    next(new Error('unauthorized'))
  }
}

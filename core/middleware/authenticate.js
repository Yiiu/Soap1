import jwt from 'jsonwebtoken'
import config from 'config'
import { User } from 'core/models'
export async function isAuthenticated (req, res, next) {
  try {
    const { authorization } = req.headers
    let id = await jwt.verify(authorization, config.secret).id
    req.userInfo = await User.findById(id)
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
    req.userInfo = await User.findById(id)
    next()
  } catch (err) {
    next(new Error('unauthorized'))
  }
}

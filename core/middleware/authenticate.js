import jwt from 'jsonwebtoken'
import config from 'config'
export async function isAuthenticated (req, res, next) {
  try {
    const { authorization } = req.headers
    if (!authorization) throw 'unauthorized'
    req.userId = await jwt.verify(authorization, config.secret).id
    next()
  } catch (err) {
    next(new Error('unauthorized'))
  }
}

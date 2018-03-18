import oauth from '../oauth'

export const isAuthenticated = async (req, res, next) => {
  try {
    await oauth.authenticate(req, res)
    return next()
  } catch (err) {
    next(err)
  }
}
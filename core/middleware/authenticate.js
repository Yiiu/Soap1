import { User } from 'core/models'
import { ApiError } from 'core/util'
export async function isAuthenticated (req, res, next) {
  try {
    const { userId } = req.session
    if (!userId) {
      throw new ApiError(401)
    } else {
      let user = await User.findById(userId)
      if (!user) {
        throw new ApiError(401)
      } else {
        req.user = user
        next()
      }
    }
  } catch (err) {
    next(err)
  }
}

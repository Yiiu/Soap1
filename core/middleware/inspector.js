import validator from 'core/util/inspector'
export const inspector = (obj, type = 'body') => {
  return function (req, res, next) {
    try {
      validator(obj)(req[type])
      next()
    } catch (error) {
      next(error)
    }
  }
}

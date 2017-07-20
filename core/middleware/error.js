import { ApiError, ValidationError } from 'core/util'

export function handleError (error, req, res, next) {
  if (error instanceof ValidationError) {
    res.status(400).json(error)
  } else if (error instanceof ApiError) {
    let err = {
      message: error.message
    }
    if (err.error) err.error = err.error
    res.status(error.status).json(err)
  } else if (error instanceof Error) {
    res.status(400).json({
      message: error.message,
      error: error.stack.split('\n')
    })
  } else {
    res.status(400).json({
      error: error
    })
  }
  next()
}

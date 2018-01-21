import { ApiError, ValidationError } from '../util'

type errorType = ApiError | ValidationError | Error

export function handleError (error: errorType , req, res, next) {
  if (error instanceof ValidationError) {
    res.status(400).json(error)
  } else if (error instanceof ApiError) {
    const err = {
      message: error.message ? error.message : error.error
    }
    res.status(error.status).json(err)
  } else if (error instanceof Error) {
    res.status(400).json({
      message: error.message,
      error: error.stack.split('\n')
    })
  } else {
    res.status(400).json({
      error
    })
  }
  console.error(error)
  next()
}

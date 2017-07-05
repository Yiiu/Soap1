export function handleError (error, req, res, next) {
  if (error instanceof Error) {
    res.status(400).json({
      message: error.message,
      stack: error.stack.split('\n')
    })
  } else {
    res.status(400).json({
      error: error
    })
  }
  next()
}

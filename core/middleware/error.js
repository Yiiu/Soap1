let known_errors = {
  200: 'OK',
  400: 'bad_request',
  401: 'unauthorized',
  403: 'forbidden',
  404: 'not_found',
  500: 'internel_server_error',
  503: 'service_unavailable',
}
export function handleError (error, req, res, next) {
  let status = 400
  if (error instanceof Error) {
    Object.keys(known_errors).forEach(type => {
      if (known_errors[type] === error.message) {
        status = type
      }
    })
    res.status(status).json({
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

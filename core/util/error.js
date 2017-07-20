let known_errors = {
  200: 'OK',
  400: 'bad_request',
  401: 'unauthorized',
  403: 'forbidden',
  404: 'not_found',
  500: 'internel_server_error',
  503: 'service_unavailable',
}

export class ApiError {
  constructor (status, message = null, err = null) {
    this.status = status
    if (err) {
      this.error = err
    } else {
      this.error = known_errors[status] || 'unknown_error'
    }
    this.message = message
  }
}

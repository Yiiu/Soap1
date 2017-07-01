let known_errors = {
  200: 'OK',
  400: 'bad_request',
  401: 'unauthorized',
  403: 'forbidden',
  404: 'not_found',
  500: 'internel_server_error',
  503: 'service_unavailable',
}
export default function () {
  return function(req, res, next) {
    if (req.cute) return next()
    req.cute = new Cute(req, res)
    next()
  }
}
class Cute {
  constructor (req, res) {
    this.req = req
    this.res = res
  }
  async error (code, msg) {
    msg = verifyMsg(msg)
    this.res.status(code).json(msg)
    return this
  }
  async ok (msg) {
    msg = verifyMsg(msg)
    this.res.status(200).json(msg)
    return this
  }
  async bad (msg) {
    this.error(400, msg)
  }
  async unAuth (msg) {
    this.error(401, msg)
  }
  async forbidden (msg) {
    this.error(403,  msg)
  }
}

function verifyMsg (msg) {
  let msgs = {}
  if (typeof(msg) === 'string') {
    msgs.message = msg
  } else if (msg instanceof Object) {
    msgs = msg
  } else {
    throw '必须是字符串或对象'
  }
  return msgs
}

import { User } from '../models'
import respond from '../middleware/respond'
/**
 * 注册用户
 *
 * @param  {[req]}
 * @param  {[res]}
 * @return {[Promise]}
 */
export let signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body
    let userByName  = await User.findOne({ username: username })
    let userByEmail  = await User.findOne({ email: email })
    if (userByName) throw new Error('exist_username')
    if (userByEmail) throw new Error('exist_email')
    let user = await new User({ username: username, email: email })
    await User.signup(user, password)
    res.json({
      message: '注册成功'
    })
  } catch (error) {
    next(error)
  }
}

export let logout = async (req, res) => {
  req.logout()
  res.json({
    message: '退出成功'
  })
}

/**
 * 登录
 *
 * @param  {[req]}
 * @param  {[res]}
 * @return {[Promise]}
 */
export let login = async (req, res) => {
  let info
  try {
    info = await User.login(req.body.username, req.body.password)
  } catch (error) {
    if (error === 'pwdIncorrect') {
      return respond(res, req.__('errors.api.accounts.password.incorrectPassword'))
    } else {
      return respond(res, error)
    }
  }
  res.cookie('token', info.token, {
    httpOnly: true
  })
  return res.json({
    message: req.__('info.api.accounts.common.loginSuccess'),
    token: info.token,
    data: info.data
  })
}

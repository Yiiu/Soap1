import { User } from 'core/models'
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
    let user = await new User({ username: username, email: email })
    await User.signup(user, password)
    res.status(200).json({})
  } catch (error) {
    next(error)
  }
}

export let signin = async (req, res, next) => {
  try {
    const { userOrEmail, password } = req.body
    let userInfo = await User.signin(userOrEmail, password, req)
    res.status(200).json(userInfo)
  } catch (error) {
    next(error)
  }
}

export let logout = async (req, res) => {
  req.session.destroy()
  res.json({
    message: '退出成功'
  })
}

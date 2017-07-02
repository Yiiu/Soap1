import jwt from 'jsonwebtoken'
import User from 'core/models/user'
import crypto from 'crypto'
import { isEmail } from 'validator'
import { filterObj } from 'core/util'
import respond from 'core/middleware/respond'
import config from 'config'
let userArr = ['_id', 'nickname', 'username', 'email', 'location', 'website', 'created_at', 'updated_at', 'login_at', 'cover', 'avatar', 'description']
export default async function (schema) {
  schema.statics.signup = async function (user, pwd) {
    if (!(user in this)) {
      user = new this(user)
    }
    let userInfo = await this.findByUsername(user.username)
    if (userInfo) throw new Error('exist_username')
    return await user.setPassword(user, pwd)
  }
  // 模型的用户名查找方法
  schema.statics.findByUsername = async function (userName) {
    let userInfo = await this.findOne({ username: userName })
    return userInfo
  }
  schema.methods.setPassword = async function (user, pwd) {
    // 生成随机数
    let salt = await crypto.randomBytes(32).toString('hex')
    let hash = await crypto.pbkdf2Sync(pwd, salt, 23333, 32, 'sha512').toString('hex')
    user.salt = salt
    user.hash = hash
    await user.save()
    return true
  }
  schema.statics.login = async function (username, pwd) {
    let userInfo
    if (isEmail(username)) {
      userInfo = await this.findOne({ email: username })
    } else {
      userInfo = await this.findOne({ username: username })
    }
    if (!userInfo) throw new Error('exist_userOrEmail')
    let salt = userInfo.salt
    let hash = await crypto.pbkdf2Sync(pwd, salt, 23333, 32, 'sha512').toString('hex')
    if (hash !== userInfo.hash) throw new Error('exist_password')

    let token = jwt.sign({
      id: userInfo._id
    }, config.secret, {
      expiresIn: '7d'
    })
    userInfo.login_at = Date.now()
    userInfo.save()
    return token
  }
  schema.statics.authenticate = async function (req, res, next) {
    try {
      let token = req.cookies.token || req.headers.authorization
      await jwt.verify(token, config.secret)
    } catch (error) {
      return respond(res, [401, 'error'])
    }
    next()
  }
  schema.statics.getUserInfo = async function (token) {
    let info = await jwt.verify(token, config.secret)
    let userInfo = await User.findById(info.id)
    return userInfo
  }
}

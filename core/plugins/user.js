import jwt from 'jsonwebtoken'
import { User, Photo } from 'core/models'
import crypto from 'crypto'
import { filterObj } from 'core/util'
import { isEmail } from 'validator'
import config from 'config'
let userSelect = 'nickname username description avatar followers following website location photos'
export default function (schema) {
  schema.statics.signup = async function (user, pwd) {
    if (!(user in this)) {
      user = new this(user)
    }
    let userByName  = await this.findOne({ username: user.username })
    let userByEmail  = await this.findOne({ email: user.email })
    if (userByName) throw new Error('exist_username')
    if (userByEmail) throw new Error('exist_email')
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
  schema.statics.signin = async function (username, pwd, req) {
    let userInfo
    if (isEmail(username)) {
      userInfo = await this.findOne({ email: username })
    } else {
      userInfo = await this.findOne({ username: username })
    }
    if (!userInfo) throw 'exist_userOrEmail'
    let salt = userInfo.salt
    let hash = await crypto.pbkdf2Sync(pwd, salt, 23333, 32, 'sha512').toString('hex')
    if (hash !== userInfo.hash) throw 'exist_password'

    // let token = jwt.sign({
    //   id: userInfo._id
    // }, config.secret, {
    //   expiresIn: '7d'
    // })
    userInfo.login_at = Date.now()
    userInfo.save()
    req.session.userId = userInfo._id
    return
  }
  schema.statics.fetch = async function (id) {
    let info = await User.findById(id)
    return filterObj(info, userArr)
  }

  schema.statics.getUserInfo = async function (id) {
    let info = await User
      .findById(id)
      .select(userSelect)
    return info
  }

  schema.statics.getUserPhotos = async function (id) {
    let info = await Photo
      .find({ user: id })
      .sort('_id')
      .populate({ path: 'user', select: userSelect })
    return info
  }
}

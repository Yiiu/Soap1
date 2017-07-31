import { User, Photo, Like } from 'core/models'
import crypto from 'crypto'
import { isEmail } from 'validator'
import { ApiError } from 'core/util'
import config from 'config'

let userSelect = 'nickname username description avatar followers following website location photos like'
export default function (schema) {
  schema.statics.select = 'nickname username description avatar followers following website location photos'
  schema.statics.signup = async function (user, pwd) {
    if (!(user in this)) {
      user = new this(user)
    }
    let userByName  = await this.findOne({ username: user.username })
    let userByEmail  = await this.findOne({ email: user.email })
    if (userByName) throw new ApiError(400, 'exist_username')
    if (userByEmail) throw new ApiError(400, 'exist_email')
    return await user.setPassword(user, pwd)
  }
  schema.methods.setPassword = async function (user, pwd) {
    // 生成随机数
    let salt = await crypto.randomBytes(32).toString('hex')
    let hash = await crypto.pbkdf2Sync(pwd, salt, 23333, 32, 'sha512').toString('hex')
    user.salt = salt
    user.hash = hash
    user.likeSchema = await Like.create({ user: user._id, photo: [] })
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
    if (!userInfo) throw new ApiError(400, 'exist_userOrEmail')
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

    return await User
      .findById(userInfo._id)
      .select(userSelect)
  }
  schema.statics.getUserInfo = async function (id) {
    let info = await User
      .findById(id)
      .select(userSelect)
    if (!info.avatar) info.avatar = config.default_avatar
    return info
  }
  schema.statics.getUserNameInfo = async function (username) {
    let info = await User
      .findOne({ username: username })
      .select(userSelect)
    if (!info.avatar) info.avatar = config.default_avatar
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

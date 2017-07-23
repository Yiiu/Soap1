/**
 * Created by yuer on 2017/5/18.
 */
import { User } from 'core/models'

export const getOneUserInfo = async function (req, res, next) {
  try {
    const { id } = req.params
    let userInfo
    if (!id) {
      const username = req.params[0]
      if (!username) throw 'fucking username??'
      userInfo = await User.getUserNameInfo(username)
    } else {
      if (id === 'me') {
        const { userId } = req.session
        userInfo = await User.getUserInfo(userId)
      } else {
        userInfo = await User.getUserInfo(id)
      }
    }
    res.json(userInfo)
  } catch (error) {
    next(error)
  }
}

export const getOneUserPhoto = async function (req, res, next) {
  try {
    const { id } = req.params
    let userInfo
    if (id === 'me') {
      const { userId } = req.session
      userInfo = await User.getUserPhotos(userId)
    } else {
      userInfo = await User.getUserPhotos(id)
    }
    res.json(userInfo)
  } catch (error) {
    next(error)
  }
}

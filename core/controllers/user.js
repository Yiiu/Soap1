/**
 * Created by yuer on 2017/5/18.
 */
import { User, Photo, Like } from 'core/models'

export const getOneUserInfo = async function (req, res, next) {
  try {
    const { userId: id } = req.params
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
    const { userId: id } = req.params
    let userInfo
    if (id === 'me') {
      const { userId } = req.session
      userInfo = await Photo.getPhotos(userId)
    } else {
      userInfo = await Photo.getPhotos(id)
    }
    res.json(userInfo)
  } catch (error) {
    next(error)
  }
}


export const getUserLikePhoto = async (req, res, next) => {
  try {
    const { params } = req
    let like = await Like.getPhotos(params.userId)
    return res.json(like)
  } catch (error) {
    next(error)
  }
}

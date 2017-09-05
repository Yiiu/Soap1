/**
 * Created by yuer on 2017/5/18.
 */

export const getUserInfo = async function (req, res, next) {
  try {
    const { User, Photo, Like } = req.models
    const { userId: id } = req.params
    const { name } = req.query
    let userInfo = null
    if (name) {
      userInfo = await User.getUserNameInfo(id)
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

export const getUserPhotos = async function (req, res, next) {
  try {
    const { Photo } = req.models
    const { userId } = req.params
    const { name } = req.query
    let userInfo = await Photo.getPhotoList(userId)
    res.json(userInfo)
  } catch (error) {
    next(error)
  }
}


export const getUserLikePhotos = async (req, res, next) => {
  try {
    const { Like } = req.models
    const { params } = req
    let like = await Like.getUserPhotos(params.userId)
    return res.json(like)
  } catch (error) {
    next(error)
  }
}

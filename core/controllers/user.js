/**
 * Created by yuer on 2017/5/18.
 */
import { User } from 'core/models'
import { ApiError } from 'core/util'

export const getOneUser = async function (req, res, next) {
  try {
    let id = req.params.id
    let data = await User.findOneId(id)
      .select('-salt -hash')
      .lean()
    if (!data) {
      new ApiError(400, 'no_user')
    }
    return res.json({
      message: 'test',
      data: data
    })
  } catch (error) {
    next(error)
  }
}
export const tokenUser = async function (req, res) {
  let token = req.headers.authorization
  let userInfo
  try {
    userInfo = await User.getUserInfo(token)
  } catch (e) {
    console.log(e)
  }
  return res.json({
    data: userInfo
  })
}

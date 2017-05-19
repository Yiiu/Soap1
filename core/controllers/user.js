/**
 * Created by yuer on 2017/5/18.
 */
import { User } from '../models'
import respond from '../middleware/respond'

const defaultUser = ['slug', 'name', 'email', 'cover', 'avatar', 'description']

export const getOneUser = async function (req, res) {
    console.log(req.session)
    let name = req.params.name
    let data = await User.findOne({username: name})
        .select('-salt -hash')
        .lean()
        .catch(e => {

        })

    if (!data) {
        return respond(res, [
            400,
            {
                message: req.__('errors.api.user.common.notUser')
            }
        ])
    }
    return res.json({
        message: 'test',
        data: data
    })
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
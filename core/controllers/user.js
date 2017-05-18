/**
 * Created by yuer on 2017/5/18.
 */
import { User } from '../models'
import respond from '../middleware/respond'

const defaultUser = ['slug', 'name', 'email', 'cover', 'avatar', 'description']

export const getOneUser = async function (req, res) {
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
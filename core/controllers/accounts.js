import { User } from '../models'


/** 
 * 注册用户
 * 
 * @param  {[req]}
 * @param  {[res]}
 * @return {[Promise]}
 */
export let register = async (req, res) => {
    await User.register(new User({name: req.body.username, email: req.body.email}), req.body.password, (err, account) => {
        if (err) {
            respond(res, err)
        } else {
            return res.json({
                message: '注册成功'
            })
        }
    })
}
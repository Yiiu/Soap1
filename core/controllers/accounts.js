import { User } from '../models'
import respond from '../middleware/respond'
import validator from 'validator'

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

/** 
 * 登录
 * 
 * @param  {[req]}
 * @param  {[res]}
 * @return {[Promise]}
 */
export let login = async (req, res) => {
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
export let Verify = {
    register: async (req, res, next) => {
        let err = req.__('errors').api.accounts
        if (!req.body.username || !validator.isLength(req.body.username, {min:1, max: undefined})) {
            return res.status(401).json({message: err.name.correctUserName})
        }
        if (!req.body.email || !validator.isLength(req.body.email, {min:3, max: undefined})) {
            return res.status(401).json({message: err.email.emailCanNotBeBlank})
        } else if (!validator.isEmail(req.body.email)) {
            return res.status(401).json({message: err.email.correctEmail})
        }
        if (!req.body.password || !validator.isLength(req.body.password, {min:6, max: 16})) {
            return res.status(401).json({message: err.email.correctUserName})
        }

        next()
    }
}
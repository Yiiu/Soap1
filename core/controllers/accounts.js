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
export let signup = async (req, res) => {
    let user = await new User({ username: req.body.username, email: req.body.email })
    try {
        await User.register(user, req.body.password)
    } catch (error) {
        return respond(res, [
            400,
            error
        ])
    }
    console.log(user)
    res.json({
        message: '注册成功'
    })
}

export let logout = async (req, res) => {
    req.logout()
    res.json({
        message: '退出成功'
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
    let info
    try {
        info = await User.login(req.body.username, req.body.password)
    } catch (error) {
        if (error === 'pwdIncorrect') {
            return respond(res, req.__('errors.api.accounts.password.incorrectPassword'))
        } else {
            return respond(res, error)
        }
    }
    res.cookie('token', info.token, {
        httpOnly: true
    })
    return res.json({
        message: req.__('info.api.accounts.common.loginSuccess'),
        token: info.token,
        data: info.data
    })
}
export let Verify = {
    signup: async (req, res, next) => {
        if (!req.body.username || !validator.isLength(req.body.username, { min:1, max: undefined })) {
            return respond(res, '用户已存在')
        }
        if (!req.body.email || !validator.isLength(req.body.email, {min:3, max: undefined})) {
            return respond(res, req.__('errors.api.accounts.email.emailCanNotBeBlank'))
        } else if (!validator.isEmail(req.body.email)) {
            return respond(res, req.__('errors.api.accounts.email.correctEmail'))
        }
        if (!req.body.password || !validator.isLength(req.body.password, {min:6, max: 16})) {
            return respond(res, req.__('errors.api.accounts.password.passwordDoesNotComplyLength'))
        }
        if (await User.findOne({username: req.body.username})) {
            return respond(res, req.__('errors.api.accounts.name.userNameExists'))
        }

        if (await User.findOne({email: req.body.email})) {
            return respond(res, req.__('errors.api.accounts.email.emailExists'))
        }

        next()
    },
    login: async (req, res, next) => {
        if (req.user) {
            return respond(res, [
                403,
                {
                    message: req.__('info.api.accounts.common.logged')
                }
            ])
        }
        if (!validator.isLength(req.body.username, {min:1, max: undefined})) {
            return respond(res, req.__('errors.api.accounts.name.correctUserName'))
        } else {
            let i = await User.findOne({username: req.body.username})
            if (!i) {
                return respond(res, req.__('errors.api.accounts.name.noUserFound'))
            }
        }
        if (!validator.isLength(req.body.password, {min:6, max: 16})) {
            return respond(res, req.__('errors.api.accounts.password.passwordDoesNotComplyLength'))
        }
        next()
    }
}

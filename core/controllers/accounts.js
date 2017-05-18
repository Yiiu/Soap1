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
    let user = await new User({username: req.body.username, email: req.body.email})
    await User.register(user, req.body.password, (err, account) => {
        if (err) {
            respond(res, err)
        } else {
            return res.json({
                message: req.__('info.api.accounts.common.registerSuccess')
            })
        }
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
    passport.authenticate('local', function(err, user, info) {
        if (err) {
            return respond(res, [
                400,
                {
                    message: req.__('errors.api.accounts.common.loginErrorOccurred'),
                    info: err
                }
            ])
        }
        if (!user) {
            return respond(res, [
                400,
                {
                    message: req.__('errors.api.accounts.password.incorrectPassword')
                }
            ])
        }
        req.logIn(user, function(err) {
            if (err) {
                return respond(res, [
                    400,
                    {
                        message: req.__('errors.api.accounts.common.loginErrorOccurred'),
                        info: err
                    }
                ])
            }
            return res.json({
                message: req.__('info.api.accounts.common.loginSuccess')
            })
        })
    })(req, res)
}
export let Verify = {
    register: async (req, res, next) => {
        if (!req.body.username || !validator.isLength(req.body.username, {min:1, max: undefined})) {
            return respond(res, [
                400,
                {
                    message: req.__('errors.api.accounts.name.correctUserName')
                }
            ])
        }
        if (!req.body.email || !validator.isLength(req.body.email, {min:3, max: undefined})) {
            return respond(res, [
                400,
                {
                    message: req.__('errors.api.accounts.email.emailCanNotBeBlank')
                }
            ])
        } else if (!validator.isEmail(req.body.email)) {
            return respond(res, [
                400,
                {
                    message: req.__('errors.api.accounts.email.correctEmail')
                }
            ])
        }
        if (!req.body.password || !validator.isLength(req.body.password, {min:6, max: 16})) {
            return respond(res, [
                400,
                {
                    message: req.__('errors.api.accounts.password.passwordDoesNotComplyLength')
                }
            ])
        }
        if (await User.findOne({username: req.body.username})) {
            return respond(res, [
                400,
                {
                    message: req.__('errors.api.accounts.name.userNameExists')
                }
            ])
        }

        if (await User.findOne({email: req.body.email})) {
            return respond(res, [
                400,
                {
                    message: req.__('errors.api.accounts.email.emailExists')
                }
            ])
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
            return respond(res, [
                400,
                {
                    message: req.__('errors.api.accounts.name.correctUserName')
                }
            ])
        } else {
            let i = await User.findOne({username: req.body.username})
            if (!i) {
                return respond(res, [
                    400,
                    {
                        message: req.__('errors.api.accounts.name.noUserFound')
                    }
                ])
            }
        }
        if (!validator.isLength(req.body.password, {min:6, max: 16})) {
            return respond(res, [
                400,
                {
                    message: req.__('errors.api.accounts.password.passwordDoesNotComplyLength')
                }
            ])
        }
        next()
    }
}
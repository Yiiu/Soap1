import passport from 'passport'
import LocalStrategy from 'passport-local'

import User from '../app/models/user'

passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

passport.authenticateMiddleware = function authenticationMiddleware() {
    return function (req, res, next) {
        if (req.isAuthenticated()) {
            return next()
        } else {
            res.status(401).json({message: '没权限'})
        }
    }
}

export default passport
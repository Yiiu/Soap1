import bodyParser from 'body-parser'
import morgan from 'morgan'
import i18n from '../core/i18n'
import cookieParser from 'cookie-parser'
import config from '../config'

export default (app) => {
    // Node.js body parsing middleware.
    app.set('secret', config.secret)
    app.use(bodyParser.json())
    app.use(morgan('dev'))
    app.use(cookieParser())
    app.use(i18n.init)
}
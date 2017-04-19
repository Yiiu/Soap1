import bodyParser from 'body-parser'
import morgan from 'morgan'
import i18n from '../core/i18n'

export default (app) => {
    // Node.js body parsing middleware.
    app.use(bodyParser.json())
    app.use(morgan('dev'))
    app.use(i18n.init)
}
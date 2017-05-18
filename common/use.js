import bodyParser from 'body-parser'
import morgan from 'morgan'
import i18n from '../core/i18n'
import session from 'express-session'
import { mongo as mongoConfig } from '../config'
const MongoStore = require('connect-mongo')(session)

export default (app) => {
    // Node.js body parsing middleware.
    app.set('secret', 'soap')
    app.use(bodyParser.json())
    app.use(morgan('dev'))
    app.use(session({
        secret: app.get('secret'),
        resave: false,
        saveUninitialized: false,
        store: new MongoStore({
            url: `mongodb://${mongoConfig.username}:${mongoConfig.pwd}@${mongoConfig.host}:${mongoConfig.port}/${mongoConfig.db}`,
        }),
        cookie: {maxAge: 5 * 24 * 60 * 60 * 1000} //store保存时间
    }))

    app.use(i18n.init)
}
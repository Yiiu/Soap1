import bodyParser from 'body-parser'
import morgan from 'morgan'
import config from 'config'
import cute from './cute'
import session from 'express-session'
import ms from 'ms'
const MongoStore = require('connect-mongo')(session)

export default (app) => {
  // Node.js body parsing middleware.
  app.set('secret', config.secret)
  app.use(session({
    secret: config.secret,
    store: new MongoStore({
      url: `mongodb://${config.mongodb.username}:${config.mongodb.pwd}@${config.mongodb.host}:${config.mongodb.port}/${config.mongodb.db}`
    }),
    cookie: {
      maxAge: 400000000
    },
    resave: false,
    rolling: true,
    saveUninitialized: true,
  }))
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(morgan('dev'))
  app.use(cute())
  app.use(function (req, res, next) {
    if (req.headers['content-type'] === 'application/x-www-form-urlencoded') {
      req.body = Object.assign({}, req.body)
    }
    next()
  })
}

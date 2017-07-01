import bodyParser from 'body-parser'
import morgan from 'morgan'
import config from '../config'
import cute from './cute'

export default (app) => {
  // Node.js body parsing middleware.
  app.set('secret', config.secret)
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(morgan('dev'))
  app.use(cute())
}

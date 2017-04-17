import bodyParser from 'body-parser'
import morgan from 'morgan'

export default (app) => {
    // Node.js body parsing middleware.
    app.use(bodyParser.json())
    app.use(morgan('dev'))
}
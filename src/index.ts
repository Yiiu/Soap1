import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as morgan from 'morgan'

import oauth from './oauth'
import connect from './model'
import config from './config'
import routes from './routes'
import { handleError, model } from './middleware'

const app = express()

export default async () => {
  try {
    console.log('------------------------------------')
    console.log('  soap服务端启动中...')
    await connect()

    app.set('port', config.port || 3000)

    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(morgan('dev'))

    app.use((req, res, next) => {
      if (req.headers['content-type'] === 'application/x-www-form-urlencoded') {
        req.body = Object.assign({}, req.body)
      }
      next()
    })

    app.use(model())
    app.use('/', routes)
    app.use(handleError)

    app.listen(config.port, () => {
      console.log(`  biu~启动好啦，在${config.port}端口`)
      console.log('  Press CTRL-C to stop')
      console.log('------------------------------------')
    })
  } catch (err) {
    console.error(err)
    console.log('  启动失败...')
    console.log('------------------------------------')
  }
}

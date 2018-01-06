import * as express from 'express'
import * as oauthServer from 'oauth2-server'
import * as bodyParser from 'body-parser'
import * as morgan from 'morgan'

import oauth from './oauth'
import connect from './modal'
import config from './config'

const app = express()

export default async () => {
  try {
    console.log('------------------------------------')
    console.log('  soap服务端启动中...')

    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(morgan('dev'))

    app.set('port', config.port || 3000)

    await connect()

    app.all('/oauth/token', async (req, res, next) => {
      const request = new oauthServer.Request(req);
      const response = new oauthServer.Response(res);
      try {
        const token = await oauth.token(request, response)
        return res.json(token)
      } catch (err) {
        return res.status(500).json(err)
      }
    });

    app.get('/', (req, res) => {
      return res.json({
        data: 1
      })
    })

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

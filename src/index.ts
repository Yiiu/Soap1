import * as express from 'express'
import * as oauthserver from 'oauth2-server'

import connect from './modal'

import config from './config'

const app = express()

export default async () => {
  try {
    console.log('------------------------------------')
    console.log('  soap服务端启动中...')

    app.set('port', config.port || 3000)

    await connect()

    app.listen(config.port, () => {
      console.log(`  biu~启动好啦，在${config.port}端口`)
      console.log('  Press CTRL-C to stop')
      console.log('------------------------------------')
    })

    // app.oauth = oauthserver({
    //   model: {}, // See below for specification 
    //   grants: ['password'],
    //   debug: true
    // });

    app.all('/oauth/token', app.oauth.grant());

    app.get('/', (req, res) => {
      return res.json({
        data: 1
      })
    })
  } catch (err) {
    console.error(err)
    console.log('  启动失败...')
    console.log('------------------------------------')
  }
}

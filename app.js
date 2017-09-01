import 'app-module-path/register'
import 'common/logger'

import express from 'express'
import config from 'config'
import soap from 'core'
import { models } from 'core/models'
import { handleError } from 'core/middleware'

console.log('------------------------------------')
console.log('Soap正在启动中。。。。')

// router
import routes from './core/routes'
// use middleware
import use from './common/use'

const app = new express()

use(app)
app.use(models)
app.use(routes)
app.use(handleError)

soap()
  .then(() => {
    app.listen(config.port, () => {
      console.log(`biu~启动好啦，在${config.port}端口`)
      console.log('------------------------------------')
    })
  })
  .catch(err => {
    console.error(err)
    process.exit(-1)
  })

process.on('SIGINT', () => {
  console.log('bye~')
  process.exit()
})

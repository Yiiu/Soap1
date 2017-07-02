import 'app-module-path/register'
import express from 'express'
import config from 'config'
import 'common/logger'
import soap from 'core'
console.log('------------------------------------')
console.log('Soap正在启动中。。。。')
// router
import routes from './core/routes'
// use middleware
import use from './common/use'

const app = new express()

use(app)
app.use(routes)
app.use(function (err, req, res, next) {
  console.log(err)
  if (err instanceof Error) {
    res.status(400).json({
      message: err.message,
      stack: err.stack.split('\n')
    })
  }
})

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

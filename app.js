import express from 'express'
import config from './config'
import './core/models/index'

// router
import routes from './core/routes'

// use middleware
import use from './common/use'
// logger
import './common/logger'

const app = new express()

use(app)
routes(app)

process.on('SIGINT', () => {
    console.log('bye~')
    process.exit()
})

app.listen(config.port, () => {
    console.log(`port ${config.port}!`)
    console.log('biu~')
})

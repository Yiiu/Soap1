import api from './api'
import next from 'next'
import routes from './views'
import fp from 'path'
function relative (path) {
    return fp.join(__dirname, path)
}

const dev = process.env.NODE_ENV !== 'production';
const app = next({
    dev: dev,
    dir: relative('../../app')
})

const handler = routes.getRequestHandler(app)

export default (server) => {
    /*
    server
        .use('/api', api)
     */
    app.prepare()
        .then(() => 
            server
                .use('/api', api)
                .use(handler)
        )
}
import api from './api'
export default (server) => {
    server
        .use('/api', api)
    // view(server)
}

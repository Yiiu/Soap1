import api from './api'
import view from './views'
export default (server) => {
    server
        .use('/api', api)
    // view(server)
}
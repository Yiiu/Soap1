import Nuxt from 'nuxt'
import fp from 'path'
import config from '../../../nuxt.config.js'
function relative (path) {
    return fp.join(__dirname, path)
}

export default async (app) => {
    const nuxt = new Nuxt(config)
    app.use(nuxt.render)
    if (config.dev) {
        try {
            await nuxt.build()
        } catch (error) {
            console.log(error)
        }
    }
}
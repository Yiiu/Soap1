/**
 * Created by yuer on 2017/5/15.
 */
let config = {
    port: 2333,
    mongo: {
        host: 'localhost',
        port: 27017,
        db: 'soap',
        username: 'soap',
        pwd: 'soap'
    }
}
export default config
export let mongo = config.mongo
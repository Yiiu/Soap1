/**
 * Created by yuer on 2017/5/18.
 */
import axios from 'axios'
import config from '../../config'

axios.defaults.baseURL = config.baseUrl
axios.defaults.withCredentials = true
axios.defaults.validateStatus = function (status) {
    return status < 500 || status === 404
}
axios.interceptors.response.use(function (config) {
    if (config.status >= 400 && config.status !== 404) {
        return Promise.reject(config.data)
    } else if (config.status === 404) {
        return Promise.reject(config)
    } else {
        return config.data
    }
}, function (e) {
    return Promise.reject(e)
})
export default axios
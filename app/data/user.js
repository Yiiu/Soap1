/**
 * Created by yuer on 2017/5/18.
 */
import axios from '~plugins/axios'
export async function signup (info) {
    return await axios.post('/api/signup', info)
}
export async function login (info) {
    return await axios.post('/api/login', info)
}
export async function getOneInfo (name) {
    return await axios.post(`/api/user/${name}`)
}
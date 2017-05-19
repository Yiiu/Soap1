/**
 * Created by yuer on 2017/5/18.
 */
import axios from 'axios'
export async function signup (info) {
    return await axios.post('/api/signup', info)
}
export async function login (info) {
    return await axios.post('/api/login', info)
}
export async function getUserInfo (name) {
    return await axios.post('/api/user')
}
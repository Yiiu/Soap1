/**
 * Created by yuer on 2017/5/19.
 */
import { signup, login, getUserInfo } from '../../data/auth'
import axios from '~plugins/axios'
export default {
    // 注册用户
    async signup ({commit}, info) {
        let data = await signup(info)
        return data
    },
    // 登录
    async login ({commit}, info) {
        let data = await login(info)
        commit('SET_TOKEN', data.token)
        commit('SET_USER', data.data)
        return data
    },
    async getUserInfo ({commit}, token) {
        let data = await axios.post('/api/user', {}, {
                headers:{
                    'Authorization': token
                }
            })
    }
}
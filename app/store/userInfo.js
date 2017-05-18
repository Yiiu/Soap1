/**
 * Created by yuer on 2017/5/18.
 */
import axios from '~plugins/axios'
import { getOneInfo } from '../data/user'
export const state = {
    userInfo: null
}

export const mutations = {
    SET_INFO (state, info) {
        state.userInfo = info
    }
}
export const actions = {
    async getOneInfo (name) {
        try {
            let data = await getOneInfo(name)
        } catch (error) {
            console.log(error)
        }
    }
}
export const getter = {
    userInfo (state) {
        return state.userInfo
    }
}
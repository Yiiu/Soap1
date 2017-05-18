/**
 * Created by yuer on 2017/5/18.
 */
import { signup, login } from '../data/user'
export const state = {
    authUser: null
}

export const mutations = {
    SET_USER (state, user) {
        state.authUser = user
    }
}
export const actions = {
    async signup ({commit}, info) {
        try {
            let data = await signup(info)
            return data
        } catch (error) {
            throw error
        }
    },
    async login ({commit}, info) {
        try {
            let data = await login(info)
            return data
        } catch (error) {
            throw error
        }
    }
}
export const getters = {
    authUser (state) {
        return state.authUser
    }
}
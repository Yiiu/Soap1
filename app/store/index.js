/**
 * Created by yuer on 2017/5/18.
 */
export const state = {
    cookie: null
}
export const actions = {
    // 可以用来初次验证是否登陆
    nuxtServerInit ({commit}, {req}) {
        console.log(req.session)
        if (req.user) {
            commit('user/SET_USER', req.user)
        }
    }
}
export const getters = {
    isAuthenticated (state) {
        return !!state.user.authUser
    }
}
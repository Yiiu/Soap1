/**
 * Created by yuer on 2017/5/19.
 */

export default {
    // 可以用来初次验证是否登陆
    nuxtServerInit ({commit, dispatch}, {req}) {
        if (req.cookies.token) {
            commit('SET_TOKEN', req.cookies.token)
            dispatch('getUserInfo', req.cookies.token)
        }
    }
}
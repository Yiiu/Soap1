/**
 * Created by yuer on 2017/5/18.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'

import auth from './auth/index'

Vue.use(Vuex)

export default new Vuex.Store({
    modules:{
        auth
    },
    actions,
    getters,
    mutations
})
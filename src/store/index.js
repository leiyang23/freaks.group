import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        is_login: false,
        msg_num: 0,
    },
    mutations: {
        login(state,) {
            state.is_login = true
        },
        logout(state,) {
            state.is_login = false
        },
        set_msg_num(state, value) {
            state.msg_num = value
        },
        reduce_msg_num(state, delta) {
            state.msg_num -= delta;
            if (state.msg_num < 0) {
                state.msg_num = 0
            }
        }
    },
    actions: {},
    getters: {
        get_login_status(state) {
            return state.is_login
        },
        get_msg_num(state){
            return state.msg_num
        }
    },
    modules: {}
})

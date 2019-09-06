import Vue from 'vue'

import {
    GET_MENU
} from '@/store/mutation-types'



const getmenus = {
    state: {
        menu: '',
    },

    mutations: {
        SAVE_MENU: (state, menu) => {
            Vue.ls.set('GET_MENU', menu)
            state.menu = menu
        },
    },

    actions: {
        // 保存nemu
        SaveMenu({
            commit
        }, menu) {
            commit('SAVE_MENU', menu)
        },
    }
}

export default getmenus
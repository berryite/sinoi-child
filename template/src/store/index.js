import { createStore } from 'vuex';
import table from '../plugins/element/store/table'
import dialog from '../plugins/element/store/dialog'
import app from './modules/app';
import user from './modules/user';

export default createStore({
    state: {
        token: '',
        isMenu: 0,
        access: 0,
        userInfo: {},
    },
    mutations: {
        set_emenustate(state, status) {
            state.isMenu = status;
        },
        set_access: (state, access) => {
            state.access = access;
        },
        SET_USERINFO: (state, info) => {
            state.token = info.token;
            state.userInfo = info;
        },
        DEL_TOKEN: (state) => {
            state.token = '';
            state.userInfo = {};
        },
    },
    actions: {
        init({ commit }) {
            // let menuState = (utils.getQueryString('isMenu') == 'true');
            commit('set_emenustate', 1);
        },

        /**
         * 设置菜单
         * @param commit
         * @param status
         */
        setMenuState({ commit, status }) {
            commit('set_emenustate', status);
        },
    },
    getters: {
        isMenu: (state) => state.isMenu,
        token: (state) => state.token,
        access: (state) => state.access,
        userInfo: (state) => state.userInfo,
        sidebar: (state) => state.app.sidebar,
        title: (state) => state.app.metaName,
    },
    modules: {
        table,
        dialog,
        app,
        user,
    },
});

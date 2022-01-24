/* eslint-disable */
import routes from '@/router/routes'
const state = {
    menu: [],
    role: [],
};

const mapTree = (item, unipath='') => {
    let route = null;
    let at0 = item.path.charAt(0);
    const currPath =
        at0 == "/"
            ? item.path
            : unipath
            ? unipath + "/" + item.path
            : item.path;
    if (item.path) {
        route = {
            path: currPath,
            icon: item.icon,
            name: item.name,
            hidden: item.hidden ? item.hidden : false,
        };
    }

    if (item.children && item.children.length) {
        !route &&
            (route = {
                path: item.path,
                icon: item.icon,
                name: item.name,
                hidden: item.hidden || false,
            });
        // route.redirect = item.children[0].path;
        route.children = item.children.map((i) => mapTree(i, currPath));
    }
    return route;
};
const __getRouterList = (list = []) => {
    const r = [];
    list.filter((item) => {
        const t = mapTree(item);
        t && r.push(t);
    });
    return r;
};


const actions = {
    getUserInfo: ({ commit }) => {
        return new Promise((resolve) => {
            // axios.post('/user').then((response) => {
            //   let a = response.data
            //   resolve(a)
            // }).catch((err) => {
            //   reject(err)
            // })
            commit("SET_ROLES", [1, 2, 3]);
            resolve([1, 2, 3]);
        });
    },
    getUserMenu: ({ commit }) => {
        return new Promise((resolve) => {
            commit("SET_MENU", routes);
            resolve(__getRouterList(routes));
        });
    },
};

const mutations = {
    SET_ROLES: (state, value) => {
        state.role = value;
    },
    SET_MENU: (state, value) => {
        state.menu = value;
    },
};

export default {
    namespaced: true,
    state,
    actions,
    mutations,
};

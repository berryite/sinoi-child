import { createRouter, createWebHistory } from 'vue-router';
import store from '../store';
import routeTable from '@/router/routes';

// 路由配置
import Layout from '@/layout/index';
const __getRouterList = (list = [], result = [], unipath='') => {
    list.filter((item) => {
        if (item.children && item.children.length) {
            // obj["redirect"] = item.redirect || item.children[0].path;
            return __getRouterList(
                item.children,
                result,
                unipath ? unipath + '/' + item.path : item.path
            );
        }

        if (item.path && item.target !== 'blank') {
            let at0 = item.path.charAt(0);
            let currPath =
                at0 === '/'
                    ? item.path
                    : unipath
                    ? unipath + '/' + item.path
                    : item.path;
            let obj = {
                path: currPath,
                meta: item.meta || { name: item.name },
                props: item.props || false,
                component: () =>
                    import(`@/views${currPath}/${item.file? item.file: 'index'}.vue`),
            };

            result.push(obj);
        }
    });
    return result;
};

const routes = [
    {
        path: '/',
        name: 'Index',
        redirect: '/home',
        component: Layout,
        children: [...__getRouterList(routeTable)],
    },
];
routes[0].children.push(
    {
        path: '/403',
        name: '403',
        component: () =>
            import(/* webpackChunkName: "404" */ '../views/error/403.vue'),
    },
    {
        path: '/404',
        name: '404',
        component: () =>
            import(/* webpackChunkName: "404" */ '../views/error/404.vue'),
    },
    {
        path: '/500',
        name: '500',
        component: () =>
            import(/* webpackChunkName: "404" */ '../views/error/500.vue'),
    },
    {
        path: '/:catchAll(.*)', // 注意: 404需放置最底部
        redirect: '/404',
    },
)

const router = (baseUrl) => {
    window.__POWERED_BY_QIANKUN__ && store.commit(
      'set_access', 
      true
    );

    return createRouter({
        history: createWebHistory(
            window.__POWERED_BY_QIANKUN__ ? baseUrl : process.env.BASE_URL
        ),
        routes,
    });
};

export default router;

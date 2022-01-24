/**
 * 本地测试路由
 * name 导航名称
 * icon 图标
 * path 路由路径(需在views文件夹下创建对应路径index.vue)
 * file 文件名
 * disabled 是否禁用
 * hidden 导航中是否隐藏
 */
export default [
    {
        icon: 'font02',
        path: '/demos',
        name: 'demos',
        children: [
            {
                name: '按钮',
                path: 'button',
                children: [
                    {
                        name: '主题',
                        path: 'theme'
                    },
                    {
                        name: '单独使用',
                        path: 'base'
                    },
                    {
                        name: '用于form',
                        path: 'form'
                    },
                    {
                        name: '用于table',
                        path: 'table'
                    },
                ],
            },
            {
                name: '表单',
                path: 'form',
                children: [
                    {
                        name: 's-text',
                        path: 's-text'
                    },
                    {
                        name: 's-group',
                        path: 's-group'
                    },
                    {
                        name: '基础表单',
                        path: 'base'
                    },
                    {
                        name: '表单校验',
                        path: 'rule'
                    },
                ],
            },
            {
                name: '表格',
                path: 'table',
                children: [
                    {
                        name: '基础表格',
                        path: 'base',
                    },
                    {
                        name: '排序表格',
                        path: 'sort',
                    },
                    {
                        name: '筛选条件表格',
                        path: 'query',
                    },
                    {
                        name: '顶部slot表格',
                        path: 'slot-top',
                    },
                    {
                        name: '底部slot表格',
                        path: 'slot-bot',
                    },
                    {
                        name: '场景组合一',
                        path: 'scene1',
                    },
                ],
            },
            {
                name: '弹窗',
                path: 'dialog',
                children: [
                    {
                        name: '基础弹窗',
                        path: 'base',
                    },
                ],
            },
            {
                name: '页头',
                path: 'pageheader'
            },
            {
                name: '容器',
                path: 'box'
            },
        ],
    },
    {
        icon: 'font02',
        path: '/home',
        name: '首页'
    },
    {
        icon: 'font04',
        name: '测试路由',
        path: '/test',
        children: [
            {
                name: '测试Test',
                path: 'test1',
            },
        ],
    },
];
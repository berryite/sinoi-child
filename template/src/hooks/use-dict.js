
import { reactive } from 'vue'
import getInitDic from '@/api/3190-get-contract-common-initdic'
export default () => {
    if (getInitDic.cache) {
        return getInitDic.cache
    }


    const currentYear = new Date().getFullYear()
    const options = reactive({
        appList: [],
        contractStatusList: [],
        contractTypeList: [],
        templateTypeList: [],
        contractClassList: [],
        templateStatusList: [],
        contractStopTypeList: [],
        contractStatusPageList: [],
        templateList: [],
        yearList: [...Array(4)].map((v, i) => {
            return { label: String(currentYear + i), value: currentYear + i }
        }),
        durationUnit: [
            {
                label: '天',
                value: 1,
            },
            {
                label: '月',
                value: 2,
            },
            {
                label: '季',
                value: 3,
            },
            {
                label: '年',
                value: 4,
            },
            {
                label: '个',
                value: 5,
            },
            {
                label: '次',
                value: 6,
            },

        ],
        mode: [
            {
                label: '远程安装',
                value: 1,
            },
            {
                label: '现场安装',
                value: 2,
            },
        ],
        partyA: [
            {
                label: '是',
                value: 1,
            },
            {
                label: '否',
                value: 0,
            },
        ],
        payData: [{
            label: '全款',
            value: 1
        }, {
            label: '分期',
            value: 0
        }],
        payModeData:[{
            label:'现金',
            value:0
        },
        {
            label:'汇款',
            value:1
        },
        {
            label:'支票',
            value:2
        },
        {
            label:'转账',
            value:3
        }]
    })


    getInitDic().then(({ data }) => {
        Object.keys(options).forEach((v) => {
            if (Array.isArray(data[v])) {
                options[v] = data[v]
            }
        })
        getInitDic.cache = options
    })

    // getQueryAll().then(({ data }) => {
    //     options.templateList = data
    // })

    return options

}
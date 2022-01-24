## 基于乾坤微服务/vue3 创建的子应用模板。
### VUE
> 版本：3.0
参考地址：
https://v3.cn.vuejs.org/

### element-plus
> 版本：1.1.0-beta.24
参考地址：
https://element-plus.gitee.io/zh-CN/component/button.html

## 功能
### 1、全局功能
- 图标 https://at.alicdn.com/t/project/2895814/a35d31fd-e0a1-4331-8c29-13f2e34a5634.html?spm=a313x.7781069.1998910419.46
- 路由设置 ｜ 权限设置 ｜ 导航设置
  - routers.js 一个文件配置同时生成导航与路由功能
  - name 导航名称
  - icon 图标
  - path 路由路径 (需在views文件夹下创建对应路径index.vue)
  - hidden 导航中是否隐藏
- method (方法, 校验部分与rules共用)
  - moment.js (日期） 
- rules (校验)
  - validateEmail （邮箱）
  - validateMobile （手机号）
  - validateTel  （固话）
  - validateDomain （域名）
  - validateIdCard  （身份证号）
  - validateValid （有效值）
  - validateNumber （纯数字）
  - validateEnglish （纯英文，包含大小写）
  - validateChinese （纯中文）
  - validateInteger  (整数)
  - validatePositiveInteger  (正整数)
  - validateIncludeChinese  (包含中文)
  - validateIncludeEnglish  (包含英文)
  - validateIncludeNumber  (包含数字)

### 3、全局filter
  - toThousands （货币格式化）=> ¥500.00 [symbol]默认:'￥' [decimal places]默认:2
  - dateFormat （日期格式化）
  - toLowerCase （转小写）
  - toUpperCase （转大写）

### 4、组件【0.0.1版本】
  - s-button 按钮
  - s-box 容器
  - s-footer 容器-底部容器
  - s-page-header 容器-带返回，标题容器
  - s-dialog 弹框
  - s-form 表单
  - s-table 表格

### 5、公共页面
  - 欢迎页
  - 403 无权限
  - 404 无页面
  - 500 服务器问题

## 开发

- 克隆项目  
vue create --preset berryite/sinoi-child --clone myproject

- nodejs版本  
建议使用12.13.x以上

- 安装依赖  
npm install

- 启动服务  
npm run serve

- 浏览器访问  
https://dev-qkchild.ceboss.cn:8502/


## 目录结构
```
- interface-generator-ts
- public
- src 开发目录
  - api [action]
  - assets [静态资源]
  - components [组件]
  - directive [指令]
  - filters [过滤器]
  - hooks [公用勾子]
  - icons [图标]
  - layout [头、边栏公用部分]
  - plugins [公共组件]
  - router [路由]
  - store [全局数据]
  - theme [主题]
  - request [请求]
  - utils [工具类]
  - views [视图]
  - App.vue
  - main.js [入口文件]
  - microapp.js

```


## 发布

- 构建测试环境  
npm run build:test

- 构建预发环境  
npm run build:pre

- 构建生产环境  
npm run build:prod


## 其它

- 代码格式检查  
npm run lint【待完善】

- 代码格式检查并自动修复  
npm run lint -- --fix【待完善】

## 浏览器支持  
Modern browsers and Internet Explorer 11+.



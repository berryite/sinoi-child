# s-form 说明文档
> **s-form** 由 **s-form-item**, **s-footer**, **s-button**, **s-group**, **s-text** 5部分组件组成，各部分功能如下，<br />请严格按照提供的demo用例进行开发。

### 快捷校验
| 名称	 | 说明 |
| :-----| :---- |
| required | 必填 | 
| email | 邮箱 |
| mobile | 手机号 |
| domain | 域名（待增加） |
| money | 货币（待增加） |
| chinese | 中文（待增加） |
| english | 英文（待增加） |
| number | 数字，支持正负数（待增加） |
用法如下：
<br />
### 基本用法
```html

<s-form :model="form" @submit="submit" @search="search" @clear="clear" @reset="reset" >
    <!-- 快捷写法 默认渲染el-input -->
    <s-form-item label="订单编号" prop="orderCode" />
    <!-- 下拉框 -->
    <s-form-item label="订单状态" prop="status" component="s-group" :data="options" />
    <!-- 多/单选 -->
    <s-form-item label="订单状态" prop="status" component="s-group" :data="options"  tag="checkbox" />
    <!-- 快捷校验 （目前支持 required,email,mobile） -->
    <s-form-item label="订单状态" :rules="['required:number','email']" prop="status" component="s-group" :data="options" />
    <!-- 组合校验 -->
    <s-form-item label="订单编号" :rules="['required',{max:9,message:'超过最大值'}]" prop="orderCode" />
    <!-- 普通写法（支持与快捷混用） -->
    <s-form-item label="订单编号" prop="orderCode" >
        <el-input v-model="form.orderCode" />
    </s-form-item>

    <!-- 表单提交 -->
    <s-form-item >
        <!-- 触发表单校验，校验通过触发事件search，在路由记录当前数据信息 -->
        <s-button type="primary" run="form.search">查询</s-button>
        <!-- 触发表单校验，校验通过触发事件submit -->
        <s-button type="primary" run="form.submit">提交</s-button>
        <!-- 重置表单数据位页面初始化时候的数据，触发事件reset，清除路由数据 -->
        <s-button run="form.reset">重置</s-button>
        <!-- 清空表单数据，触发事件clear，清除路由数据 -->
        <s-button run="form.clear">清空</s-button>

        <!-- 普通click -->
        <!-- 如果handleClick返回promise对象，会自动加载loading状态，无需手动设置 -->
        <s-button @click="handleClick">点击</s-button>


    </s-form-item>
</s-form>

```
```javascript
import request from '@/api/2363-get-frontapi-service-provider-org-get-orgenum'
import { reactive } from 'vue'
import useOptions from './hooks/use-options'

export default {
    const form=reactive({
       orderCode:'',
       status:1
    })


    const handleClick=()=>{
        ...
        return request()
    }

    const options=useOptions()  

    return {form,options,handleClick}
}

```

</br>
# s-form-item 说明文档

| 说明 |
| :----- |
| 1.继承el-form-item 所有属性<br />2.新增 component 属性，不写默认使用 el-input<br />3.新增 data 属性，提供子组件数据**（必须与component="s-group"同时使用）**<br /> 4.新增 tags 属性，不写默认使用el-select组件**（必须与component="s-group"同时使用）** <br /><br />**s-group见下面说明**|


# s-footer 说明文档
s-form -> s-footer 在单独使用时与element-ui显示一样，如放到s-dialog中，会根据s-dialog底部按钮的样式进行重定义，所以，s-form整体嵌入s-dialog中时，不用调整按钮样式，以嵌入后样式为准。
详情见[demo](http://git.300.cn/chengbing/qiankun-child)

## 使用方式：
```
<s-form>
	<s-form-item label="Switch" component="el-switch" prop="switch" />
	<s-form-item label="创建时间" component="el-date-picker" prop="time" />
	<s-footer>
		<s-form-item label="">
			<s-button run="form.submit" type="primary">提交</s-button>
			<s-button run="form.reset">重置</s-button>
		</s-form-item>
	</s-footer>
</s-form>
```

# s-button 说明文档
参见：s-button说明文档

</br>

# s-group 说明文档
> 适用于返回数组集合类组件

## attributes

| 参数	 | 说明 | 类型	 | 可选值 | 默认值 |
| :-----| :---- | :---- | :---- | :---- |
| tags | 渲染元素 | array |组合方式['父级','子集']例:<br />['el-select','el-option']<br /><br />['el-radio-group','el-radio']<br />['el-radio-group','el-radio-button']<br /><br />['el-checkbox-group','el-checkbox']<br />['el-checkbox-group','el-checkbox-button'] |['el-select','el-option'] |
| data | 选项的数据（如下拉列表） | array/function |- |- |
| init | 是否在组件加载完成后加载数据 | boolen | true/false | true |
| props | 手动指定label和value对应的字段 | object | label/value |  {label:'label',value:'value'}  |

</br>

# s-text 说明文档


## attributes

| 参数	 | 说明 | 类型	 | 可选值 | 默认值 |
| :-----| :---- | :---- | :---- | :---- |
| formatDate | 时间格式化 | string | yyyy/MM/dd hh:mm:ss | yyyy/MM/dd |
| modelValue/v-model | 要现实的数据字段 | string |- |- |
| tag | 渲染的元素 | string | - | span |
| tip | 鼠标移动上去的提示信息 | string | - | - |
| emptyText | 数据为空时候的占位符 | string | - | -- |
| separator | 多条数据时的分隔符 | string | - | , |
| data | 选项的数据（会通过content===value的方式匹配出对应的lable） | string | - | - |
| props | 手动指定label和value对应的字段（不指定会自动读取） | object | label/value |  {label:'label',value:'value'}  |


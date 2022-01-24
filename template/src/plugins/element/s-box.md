# s-box 说明文档
容器。

## attributes

| 参数	 | 说明 | 类型	 | 可选值 | 默认值 |
| :-----| :---- | :---- | :---- | :---- |
| type | 样式种类 | string |1、2 |1 |
| titLeft | 头部左侧内容 | string |- |- |
| titRight | 头部右侧内容 | string |- |- |
| content | 内容 | string |- |- |

## events

无

## slots

| 事件名称	 | 说明 
| :-----| :---- |
| tit-left | 头部左侧 |
| tit-right | 头部右侧 |
| content | 内容 |
<br />

## example
```html
<!-- 默认 -->
<s-box></s-box>

<!-- 设置 title, content属性 -->
<s-box titLeft="标题" titRight="更多" content="内容"></s-box>

<!-- slot -->
<s-box>
    <template #tit-left>
        左侧文本
    </template>
    <template #tit-right>
        右侧文本
    </template>
    <template #content>
        该插槽跟模板的其它地方一样可以访问相同的实例 property (也就是相同的“作用域”)，而不能访问 的作用域。例如 url 是访问不到的：
    </template>
</s-box>
```

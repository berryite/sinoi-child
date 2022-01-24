# s-dialog 说明文档


## attributes （默认继承 el-dialog 所有属性，这里只列举额外属性）

| 参数	 | 说明 | 类型	 | 可选值 | 默认值 |
| :-----| :---- | :---- | :---- | :---- |
| uid | 路由参数记录唯一值 | string/number |- |0 |
| component | 弹窗内容 | module |- |- |


<br />

## example
### 通过component参数使用弹窗
```html
<s-dialog :component="./dialog/add.vue">
```

### 通过slot使用弹窗
```html
<s-dialog uid="slot" title="标题">
    <Table />
    <!-- 使用s-footer包裹按钮保持样式统一 -->
    <s-footer>
      <s-button run="dialog.close">关闭</s-button>
    </s-footer>
    <template #reference>
      <s-button type="default" run="dialog.open">点击弹窗(slot按钮)</s-button>
    </template>
</s-dialog>
```


### 通过store打开/关闭方法
```javascript
//打开
 $store.commit('dialog/open')
//关闭
 $store.commit('dialog/close')
 
//通过uid单独操作某个弹窗，或者需要传递参数给内部组件
 $store.commit('dialog/open',{_uid:'',...params}) //uid不传使用默认0
```
### 通过内置按钮打开弹窗
```html
  <s-dialog :component="require('./dialog/add.vue')" title="标题">
    <template #reference>
      <s-button type="default" run="dialog.open">点击弹窗(slot按钮)</s-button>
    </template>
  </s-dialog>
```
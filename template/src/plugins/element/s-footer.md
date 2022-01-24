# s-footer 说明文档
> 作用：容器
根据场景，s-footer的展示会有所不同，主要用于s-form, s-dialog中按钮展示。


## example
### 基本用法
#### s-form
```html
<s-form>
	<s-form-item label="Switch" component="el-switch" prop="switch" />
	<s-footer>
		<s-form-item label="">
			<s-button run="form.submit" type="primary">提交</s-button>
			<s-button run="form.reset">重置</s-button>
		</s-form-item>
	</s-footer>
</s-form>
```
#### s-dialog
```
<s-dialog uid="slot" title="通过slot参数显示内容">
    <s-footer>
      <s-button run="dialog.close">关闭</s-button>
    </s-footer>
</s-dialog>
```

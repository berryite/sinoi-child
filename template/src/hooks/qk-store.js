// 兼容独立运行和qinkun子应用的全局数据
class qkStore {
	static store = {
		getGlobal() {
			return null;
		},
        utils() {
            return {}
        },
        power() {
            return true
        }
	}

	/**
	 * 重载 store
	 */
	static setStore(store) {
		qkStore.store = store
	}

	/**
	 * 获取 store 实例
	 */
	static getStore() {
		return qkStore.store
	}
}

export default qkStore

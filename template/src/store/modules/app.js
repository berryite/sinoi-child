const state = {
    sidebar: true,
    size: 'medium',
};

const mutations = {
  toggle_sidebar: state => {
    state.sidebar = !state.sidebar
  },
  close_sidebar: (state) => {
    state.sidebar = false
  },
  set_size: (state, size) => {
    state.size = size
  }
}

export default {
  namespaced: true,
  state,
  mutations
}

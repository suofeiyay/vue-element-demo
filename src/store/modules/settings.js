const state = {
  /**
   * @type {boolean} true | false
   * @description Whether fix the header
   */
  fixedHeader: true,

  /**
   * @type {boolean} true | false
   * @description Whether show the logo in sidebar
   */
  sidebarLogo: false,
  /**
   * @type {boolean} true | false
   * @description Whether show the tag in nav
   */
  tagsView: true
}

const mutations = {
  CHANGE_SETTING: (state, {key, value}) => {
    if(state.hasOwnProperty(key)) {
      state[key] = value
    }
  }
}

const actions = {
  changeSettings( {commit}, data) {
    commit('CHANGE_SETTING', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
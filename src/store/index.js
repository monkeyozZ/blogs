  import Vue from 'vue'
  import Vuex from 'vuex'
  import * as actions from './actions'
  import articleDetails from './modules/articleDetails'
  import header from './modules/header'

  Vue.use(Vuex)

  export default new Vuex.Store({
    actions,
    modules: {
      articleDetails,
      header
    }
  })

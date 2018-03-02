import * as types from '../mutation-types'
const state = {
  ismoible: false,
  searchmoible: false
}

const getters = {
  ismoible: state => state.ismoible,
  searchmoible: state => state.searchmoible
}

const mutations = {
  [types.SHOWOPEN] (state, {ismoible}) {
    state.ismoible = ismoible
  },
  [types.SHOWSEARCH] (state, {searchmoible}) {
    state.searchmoible = searchmoible
  }
}

export default {
  state, mutations, getters
}

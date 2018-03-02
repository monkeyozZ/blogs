import * as types from '../mutation-types'

const state = {
  articleId: '',
  pid: '',
  listarr: []
}
const getters = {
  id: state => state.articleId,
  pid: state => state.pid,
  listarr: state => state.listarr
}
const mutations = {
  [types.SET_ID] (state, {id}) {
    state.articleId = id
  },
  [types.GET_PID] (state, {pid}) {
    state.pid = pid
  },
  [types.SET_MESSAGE] (state, {listarr}) {
    state.listarr = listarr
  }
}
export default {
  state, mutations, getters
}

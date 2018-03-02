import * as types from './mutation-types'
export const setarticleId = ({commit}, id) => {
  commit(types.SET_ID, id)
}
export const getparentId = ({commit}, pid) => {
  commit(types.GET_PID, pid)
}
export const setlistarr = ({commit}, listarr) => {
  commit(types.SET_MESSAGE, listarr)
}
export const changeshow = ({commit}, ismoible) => {
  commit(types.SHOWOPEN, ismoible)
}
export const moiblewidth = ({commit}, searchmoible) => {
  commit(types.SHOWSEARCH, searchmoible)
}

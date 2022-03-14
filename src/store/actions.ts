import { TodoItem } from './types'

const actions = {
  saveStoreTodo: ({commit}: { commit: Function }, payload: TodoItem) => commit('setStoreTodo', payload),
  saveRemoveStoreTodo: ({commit}: { commit: Function }, payload: number) => commit('setRemoveStoreTodo', payload)
}
export default actions;
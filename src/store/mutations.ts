import { State , TodoItem } from './types';

const mutations = {
  setStoreTodo: (state: State, payload: TodoItem) => state.todos.push(payload),
  setRemoveStoreTodo: (state: State, payload: number) => state.todos && state.todos.splice(payload, 1)
}
export default mutations;
import { State } from './types'

const getters = {
  getTodos: (state: State) => state.todos
}
export default getters;

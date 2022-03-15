export type State = {
  todos: TodoItem[]
}
export type TodoItem = {
  id: number,
  isDone: boolean,
  message: string
  deadline: Date
}

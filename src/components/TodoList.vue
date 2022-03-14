<template>
  <div id="myTodo">
    <form @submit.prevent="addNewTodo">
      <label for="new-todo">TODO</label>
      <input
        v-model="newTodoMessage"
        id="new-todo"
        placeholder=". . ."
      >
      <button class="icon-btn add-btn">
        <div class="add-icon"></div>
        <div class="btn-txt">ADD</div>
      </button>
    </form>
    <ul is="TodoItem"
      class="todo-list"
      v-for="(todo, index) in todos"
      :key="todo.id"
      :message="todo.message"
      @remove="removeTodo(index)"
      @setTodoItemStatus="setTodoItemStatus(index)"
      :isDone="todo.isDone"
    ></ul>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import TodoItem from './TodoItem.vue'
export default Vue.extend({
  name: 'TodoList',
  components: { TodoItem },
  data() {
    return {
      newTodoMessage: '',
      counter: 1,
    }
  },
  methods: {
    addNewTodo: function() {
      const newTodoItem = {
        id: this.counter++*10,
        isDone: false,
        message: this.newTodoMessage
      };
      this.$store.dispatch('saveStoreTodo', newTodoItem);
      this.newTodoMessage = '';
      console.log(this.todos);
    },
    removeTodo: function(index: number) {
      this.$store.dispatch('saveRemoveStoreTodo', index);
    },
    setTodoItemStatus: function(index: number) {
      this.todos[index]['isDone'] = !this.todos[index]['isDone'];
    }
  },
  computed: {
    todos: function() {
      return this.$store.getters.getTodos;
    }
  }
});
</script>
<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Spartan:wght@700&display=swap');
#myTodo {
  width: 80%;
  margin: 0 auto;
}
form {
  position: relative;
  background-color: #9798a0;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  padding: 10px;
  justify-content: center;
  box-shadow: inset 0px 5px 6px #464444;
  border: 1px solid #9d9c9c;
  input {
    outline: none;
    width: 70%;
    margin: 0 auto;
    border-radius: 10px;
    border: none;
    margin-bottom: 10px;
    font-size: 1.2rem;
    height: 50px;
    box-shadow: inset 0px 5px 6px rgb(70, 68, 68);
    color: #6a6969;
  }
  label {
    color: white;
    font-size: 1.5rem;
    font-weight: 500;
    margin: 0 auto;
    margin-bottom: 5px;
    margin-top: 5px;
    font-family: 'Spartan', sans-serif;
    color: #ebf0db;
  }
}
.icon-btn {
  width: 50px;
  height: 50px;
  border: 1px solid #cdcdcd;
  background: #ebf0db;
  border-radius: 25px;
  overflow: hidden;
  position: relative;
  bottom: 0;
  transition: width 0.2s ease-in-out;
  margin: 0 auto;
  cursor: pointer;
  box-shadow: 0 2px 10px #0000005e;
}
.add-btn:hover {
  width: 120px;
}
.add-btn::before,
.add-btn::after {
  transition: width 0.2s ease-in-out, border-radius 0.2s ease-in-out;
  content: "";
  position: absolute;
  height: 4px;
  width: 10px;
  top: calc(50% - 2px);
  background:#9798a0;
}
.add-btn::after {
  right: 14px;
  overflow: hidden;
  border-top-right-radius: 2px;
  border-bottom-right-radius: 2px;
}
.add-btn::before {
  left: 14px;
  border-top-left-radius: 2px;
  border-bottom-left-radius: 2px;
}
.icon-btn:focus {
  outline: none;
}
.btn-txt {
  opacity: 0;
  transition: opacity 0.2s;
  font-family: 'Spartan', sans-serif;
  color:  #9798a0;
}
.add-btn:hover::before,
.add-btn:hover::after {
  width: 4px;
  border-radius: 2px;
}
.add-btn:hover .btn-txt {
  opacity: 1;
}
.add-icon::after,
.add-icon::before {
  transition: all 0.2s ease-in-out;
  content: "";
  position: absolute;
  height: 20px;
  width: 2px;
  top: calc(50% - 10px);
  background: #9798a0;
  overflow: hidden;
}
.add-icon::before {
  left: 22px;
  border-top-left-radius: 2px;
  border-bottom-left-radius: 2px;
}
.add-icon::after {
  right: 22px;
  border-top-right-radius: 2px;
  border-bottom-right-radius: 2px;
}
.add-btn:hover .add-icon::before {
  left: 15px;
  height: 4px;
  top: calc(50% - 2px);
}
.add-btn:hover .add-icon::after {
  right: 15px;
  height: 4px;
  top: calc(50% - 2px);
}
</style>


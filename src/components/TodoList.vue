<template>
  <div id="myTodo">
    <main class="todo-widget">
      <img :src="images.bckgroundImg"/>
      <header>
        <label for="new-todo">TODO</label>
        <MyClock />
      </header>
      <textarea
        v-model="newTodoMessage"
        id="new-todo"
        placeholder=". . ."
      ></textarea>
      <div class="date-addbutton-container">
        <div class="button-wrapper">
          <button class="icon-btn add-btn" @click="addNewTodo">
            <div class="add-icon"></div>
            <div class="btn-txt">ADD</div>
          </button>
        </div>
        <input class="datetime" type="datetime-local" v-model="newTodoDeadline"/>
      </div>
    </main>
    <ul is="TodoItem"
      class="todo-list"
      v-for="(todo, index) in todos"
      :key="todo.id"
      :message="todo.message"
      @remove="removeTodo(index)"
      @setTodoItemStatus="setTodoItemStatus(index)"
      :isDone="todo.isDone"
      :newTodoDeadline="todo.deadline"
    ></ul>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import TodoItem from './TodoItem.vue'
import MyClock from './utils/MyClock.vue'
export default Vue.extend({
  name: 'TodoList',
  components: { TodoItem, MyClock },
  data() {
    return {
      newTodoDeadline: null,
      newTodoMessage: '',
      counter: 1,
      images: {
        bckgroundImg: require('../assets/digital200x675.jpeg')
      }
    }
  },
  methods: {
    addNewTodo: function() {
      const newTodoItem = {
        id: this.counter++*10,
        isDone: false,
        message: this.newTodoMessage,
        deadline: this.newTodoDeadline
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
    todos: function(): {}[] {
      return this.$store.getters.getTodos;
    }
  },
});
</script>
<style lang="scss" scoped>
#myTodo {
  max-width: 600px;
  margin: 0 auto;
}
.todo-widget {
  position: relative;
  height: 200px;
  background-color: #646eb9;
  // background-color: #9798a0;
  border-radius: 40px;
  display: flex;
  flex-direction : column;
  padding: 10px;
  box-shadow: inset 0px 6px 6px #373535;
  border: 1px solid #9d9c9c;
  overflow: hidden;
  img {
    right: 0;
    top: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    opacity: 40%;
  }
  header {
    position: relative;
    display: flex;
    width: 70%;
    margin: 0 auto;
    justify-content: space-between;
    label {
      font-size: 1.2rem;
      font-weight: 500;
      font-family: 'Spartan', sans-serif;
      color: #ebf0db;
      text-shadow: 1px .8px 2px rgba(0, 0, 0, 0.055);
    }
  }
  .date-addbutton-container {
    width: 80%;
    display: flex;
    justify-content: space-between;
    margin: 0 auto;
  }
  textarea, input {
    box-sizing: border-box;
    padding: 10px;
    border: 1px solid #9d9c9c;
    resize: none;
    outline: none;
    overflow: auto;
    border-radius: 15px;
    font-size: 1.2rem;
    box-shadow: inset 0px 3px 6px rgb(70, 68, 68);
    color: #6a6969;
    z-index: 1;
    font-family: 'Montserrat', sans-serif;
    font-weight: 600;
    overflow-wrap: break-word;
    background-color: #ebf0db;
  }
  textarea {
    width: 80%;
    margin: 0 auto;
    height: 100px;
    margin-bottom: 10px;
  }
  input {
    width: 67%;
    height: 50px;
    font-size: 1.1rem;
  }
}
.button-wrapper {
  box-sizing: border-box;
  min-width: 90px;
  display: flex;
  z-index: 1;
  border-radius: 25px;
  box-shadow: inset 0px 3px 6px rgb(70, 68, 68);
  border: 1px solid #9d9c9c;
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
    width: 90px;
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
}
</style>


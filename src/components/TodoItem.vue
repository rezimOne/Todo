<template>
  <li class="todo-item">
    <span :style="{ textDecoration: textStyle }">{{ message }}</span>
    <span>
      days: {{todoDeadline.days}}
      h: {{ todoDeadline.hours }}
      min: {{ todoDeadline.minutes }}
      sec: {{ todoDeadline.seconds }}
    </span>
   <div id="clockdiv"></div>
    <div class="functional-buttons">
      <button class="done-button" @click="$emit('setTodoItemStatus')"><p>v</p></button>
      <button class="remove-button" @click="$emit('remove')"><p>-</p></button>
      <button @click="myFun"></button>
    </div>
  </li>
</template>
<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  name: 'TodoItem',
  props: {
    message: {
      type: String
    },
    isDone: {
      type: Boolean
    },
    newTodoDeadline: {
      type: String
    }
  },
  data() {
    return {
      timeInterval: 0
    }
  },
  computed: {
    textStyle: function(): string {
      return this.isDone ? 'line-through' : 'none'
    },
    todoDeadline: function(): {} {
      const today = new Date().getTime()
      const deadline = new Date(Date.parse(this.newTodoDeadline)).getTime();
      const timeLeft = deadline - today
      const seconds = Math.floor((timeLeft / 1000) % 60);
      const minutes = Math.floor((timeLeft / 1000 / 60) % 60);
      const hours = Math.floor((timeLeft / (1000*60*60)) % 24);
      const days = Math.floor(timeLeft / (1000*60*60*24))
      return { timeLeft, days, hours, minutes, seconds }
    }
  },
  methods: {
    myFun: function() {
      console.log('hello')
    }
  }
});
</script>
<style lang="scss" scoped>
.todo-item {
  border-radius: 10px;
  margin: 10px 0;
  list-style: none;
  background-color: #ebf0db;
  display: flex;
  justify-content: space-between;
  position: relative;
  padding: 10px 5px;
  box-shadow: 0 2px 5px #888888;
  min-height: 30px;
  &:hover {
    background-color: #e0e4d2;
  }
}
.functional-buttons {
  display: inline-flex;
  align-items: center;
  position: relative;
  button {
    height: 20px;
    width: 20px;
    border-radius: 10px;
    border: none;
    background-color: #9798a0;
    color: #e0e4d2;
    font-weight: 600;
    font-size: 1.1rem;
    margin: 0 1px;
  }
  .remove-button p {
    position: relative;
    bottom: 3px;
    margin: 0;
  }
  .done-button p {
    position: relative;
    bottom: 2px;
    right: 1px;
    margin: 0;
  }
}
span {
  display: inline-flex;
  align-items: center;
  position: relative;
  margin-left: 5px;
  color: #6a6969;
  font-weight: 500;
}
</style>
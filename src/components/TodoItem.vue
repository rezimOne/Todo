<template>
  <li class="todo-item">
    <span :style="{ textDecoration: textStyle }">{{ message }}</span>
    <span>
      days: {{ myObj.days }}
      hours: {{ myObj.hours }}
      min: {{ myObj.minutes }}
      sec: {{ myObj.seconds }}
    </span>
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
      timeInterval: 0,
      myObj: {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
      }
    }
  },
  computed: {
    textStyle: function(): string {
      return this.isDone ? 'line-through' : 'none'
    }
  },
  methods: {
    myFun: function() {
      console.log('hello')
    }
  },
  created(){
    console.log('created');
    if (this.newTodoDeadline) {
      this.timeInterval = setInterval(() => {
        let today = new Date().getTime()
        let deadline = new Date(Date.parse(this.newTodoDeadline)).getTime();
        let timeLeft = deadline - today;
        if (timeLeft < 0 || this.isDone) {
          clearInterval(this.timeInterval);
          this.myObj = { days: 0, hours: 0, minutes: 0, seconds: 0 }
          console.log('interval clear');
        } else {
          this.myObj.seconds = Math.floor((timeLeft / 1000) % 60);
          this.myObj.minutes = Math.floor((timeLeft / 1000 / 60) % 60);
          this.myObj.hours = Math.floor((timeLeft / (1000*60*60)) % 24);
          this.myObj.days = Math.floor(timeLeft / (1000*60*60*24));
          return this;
        }
      }, 1000);
    }
  },
  beforeDestroy(){
    clearInterval(this.timeInterval)
    console.log('beforeDestroyed', 'interval clear')
  },
  destroyed(){
    console.log('destroyed')
  },
  updated(){
    console.log('updated')
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
  font-size: 0.8rem;
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
  font-weight: 600;
}
</style>
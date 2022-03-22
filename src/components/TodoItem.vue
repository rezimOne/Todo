<template>
  <li class="todo-item">
    <span :style="{ textDecoration: textStyle }">{{ message }}</span>
    <!--
    <span>
      {{ days }}days :
      {{ hours }}h :
      {{ minutes }}min :
      {{ seconds }}s
    </span>
     -->
    <div id="status-bar">
      <div :style="styles"></div>
    </div>
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
      totalTime: 0,
      onePercentOfTotalTime: 0,
      timeRemaining: { days: 0, hours: 0, minutes: 0, seconds: 0 }
    }
  },
  computed: {
    textStyle: function(): string {
      return this.isDone ? 'line-through' : 'none'
    },
    styles: function() {
      const style = {
        backgroundColor: ['#ee9393'],
        width: ['10%', '20%', '30%', '40%', '50%', '60%', '70%', '80%', '90%', '100%'],
        opacity: ['10%', '15%', '20%', '25%', '30%', '35%', '40%', '45%']
      };
      if (this.totalTime && this.onePercentOfTotalTime) {
        if (
          this.totalTime <= 100*this.onePercentOfTotalTime
          && this.totalTime > 90*this.onePercentOfTotalTime
        ) {
          return {
            backgroundColor: style.backgroundColor[0],
            width: style.width[0],
            opacity: style.opacity[0]
          }
        } else if (
          this.totalTime <= 90*this.onePercentOfTotalTime
          && this.totalTime > 80*this.onePercentOfTotalTime
        ) {
          return {
            backgroundColor: style.backgroundColor[0],
            width: style.width[1],
            opacity: style.opacity[0]
          }
        } else if (
          this.totalTime <= 80*this.onePercentOfTotalTime
          && this.totalTime > 70*this.onePercentOfTotalTime
        ) {
          return {
            backgroundColor: style.backgroundColor[0],
            width: style.width[2],
            opacity: style.opacity[1]
          }
        } else if (
          this.totalTime <= 70*this.onePercentOfTotalTime
          && this.totalTime > 60*this.onePercentOfTotalTime
        ) {
          return {
            backgroundColor: style.backgroundColor[0],
            width: style.width[3],
            opacity: style.opacity[1]
          }
        } else if (
          this.totalTime <= 60*this.onePercentOfTotalTime
          && this.totalTime > 50*this.onePercentOfTotalTime
        ) {
          return {
            backgroundColor: style.backgroundColor[0],
            width: style.width[4],
            opacity: style.opacity[2]
          }
        } else if (
          this.totalTime <= 50*this.onePercentOfTotalTime
          && this.totalTime > 40*this.onePercentOfTotalTime
        ) {
          return {
            backgroundColor: style.backgroundColor[0],
            width: style.width[5],
            opacity: style.opacity[3]
          }
        } else if (
          this.totalTime <= 40*this.onePercentOfTotalTime
          && this.totalTime > 30*this.onePercentOfTotalTime
        ) {
          return {
            backgroundColor: style.backgroundColor[0],
            width: style.width[6],
            opacity: style.opacity[4]
          }
        } else if (
          this.totalTime <= 30*this.onePercentOfTotalTime
          && this.totalTime > 20*this.onePercentOfTotalTime
        ) {
          return {
            backgroundColor: style.backgroundColor[0],
            width: style.width[7],
            opacity: style.opacity[5]
          }
        } else if (
          this.totalTime <= 20*this.onePercentOfTotalTime
          && this.totalTime > 10*this.onePercentOfTotalTime
        ) {
          return {
            backgroundColor: style.backgroundColor[0],
            width: style.width[8],
            opacity: style.opacity[6]
          }
        }
        return {
          backgroundColor: style.backgroundColor[0],
          width: style.width[9],
          opacity: style.opacity[7]
        }
      }
    }
  },
  methods: {
    myFun: function() {
      console.log(this.totalTime, this.onePercentOfTotalTime)
    }
  },
  created(){
    const deadline: number = new Date(Date.parse(this.newTodoDeadline)).getTime();
    const onePercDeadlineTime: number = (deadline - new Date().getTime())/100;
    console.log('created');
    if (deadline && onePercDeadlineTime) {
      this.timeInterval = setInterval(() => {
        let timeLeft: number = deadline - new Date().getTime();
        if (timeLeft <= 0 || this.isDone) {
          clearInterval(this.timeInterval);
          this.timeRemaining = { days: 0, hours: 0, minutes: 0, seconds: 0 }
          console.log('interval clear');
        } else {
          this.timeRemaining.seconds = Math.floor((timeLeft / 1000) % 60);
          this.timeRemaining.minutes = Math.floor((timeLeft / 1000 / 60) % 60);
          this.timeRemaining.hours = Math.floor((timeLeft / (1000*60*60)) % 24);
          this.timeRemaining.days = Math.floor(timeLeft / (1000*60*60*24));
          this.totalTime = timeLeft;
          this.onePercentOfTotalTime = onePercDeadlineTime;
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
  align-items: center;
  &:hover {
    background-color: #e0e4d2;
  }
  #status-bar {
    min-width: 50px;
    height: 20px;
    margin: 0 5px;
    box-shadow: inset 0px 1px 2px rgb(70, 68, 68);
    border-radius: 10px;
    border: 1px solid #9d9c9c;
    position: absolute;
    right: 75px;
    overflow: hidden;
    div {
      position: absolute;
      height: 100%;
    }
  }
  .functional-buttons {
    display: inline-flex;
    align-items: center;
    position: absolute;
    right: 10px;
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
}
span {
  display: inline-flex;
  align-items: center;
  position: absolute;
  margin-left: 5px;
  color: #6a6969;
  font-weight: 600;
  font-family: 'Montserrat', sans-serif;
  font-size: 1.1rem;
}
</style>
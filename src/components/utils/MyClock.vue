<template>
  <div class="clock">
    <span v-text="myClock"></span>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'Clock',
  data() {
    return {
      clockInterval: 0,
      myClock: '00:00:00'
    }
  },
  methods: {
    setCurrentTime: function(){
      const [hours, minutes, seconds] = [new Date().getHours(),new Date().getMinutes(), new Date().getSeconds()];
      const currentTime = `${(hours < 10) ? '0' + hours : hours} : ${minutes < 10 ? "0" + minutes : minutes} : ${seconds < 10 ? "0" + seconds : seconds}`;
      this.myClock = currentTime;
      return this;
    },
  },
  mounted() {
    this.clockInterval = setInterval(() => this.setCurrentTime(), 1000)
  }
});
</script>
<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=ZCOOL+QingKe+HuangYou&display=swap');
.clock {
  font-family: 'ZCOOL QingKe HuangYou', cursive;
  color: #ebf0db;;
  height: 20px;
  border-radius: 10px;
  width: 70px;
  padding: 2px;
  font-weight: bold;
  text-shadow: 1px 2px 1px rgba(0, 0, 0, 0.151);
  position: relative;
  left: 7px;
}
</style>
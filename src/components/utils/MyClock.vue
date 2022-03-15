<template>
  <div class="clock">
    <span v-text="clock.currentTime"></span>
  </div>
</template>
<script lang="ts">
export default {
  name: 'Clock',
  data() {
    return {
      clock: {
        currentTime: '00:00:00',
        clockInterval: 0
      }
    }
  },
  methods: {
    setCurrentTime() {
      const [hours, minutes, seconds] = [new Date().getHours(),new Date().getMinutes(), new Date().getSeconds()];
      this.clock.currentTime = `${(hours < 10) ? '0' + hours : hours} : ${minutes < 10 ? "0" + minutes : minutes} : ${seconds < 10 ? "0" + seconds : seconds}`;
      return this.clock.currentTime;
    },
  },
  mounted() {
    this.clock.clockInterval = setInterval(() => this.setCurrentTime(), 1000)
  },
}
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
  font-size: .9rem;
  text-shadow: 1px 2px 1px rgba(0, 0, 0, 0.151);
  position: relative;
  left: 50px;
}
</style>
<template>
  <div id="app" class="components">
    <TodoList />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import TodoList from "./components/TodoList.vue"

export default Vue.extend({
  name: "App",
  components: {
    TodoList
  },
});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.components {
  background-color: rgb(241, 227, 208);
  height: 90vh;
  margin: 0 auto;
  top: 30px;
  padding: 15px;
  position: relative;
}
</style>

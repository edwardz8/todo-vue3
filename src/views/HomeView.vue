<script setup lang="ts">
import TodoList from '@/components/TodoList.vue'
</script>

<template>
  <main class="content">
    <TodoList />
  </main>
</template>

<style lang="scss">
// global style here
:root {
  --background-color: #0e0f16;
  --text-primary: #050504;
  --text-secondary: #FFF;
  --text-favorite: #0e0f16;
  --todo-bg-color: #888888;
}
body {
  margin: 0px;
}
.content {
  // background: var(--background-color);
  height: 100vh;
  overflow: hidden;
  position: relative;
}
</style>
<template>
  <div id="app">
    <HeaderComponent />
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import HeaderComponent from './components/layout/HeaderComponent.vue';

export default {
  name: 'App',
  components: {
    HeaderComponent
  }
}
</script>

<style>
main {
  padding-top: 100px; /* 確保內容不會被固定在頂部的 header 覆蓋 */
}
</style>

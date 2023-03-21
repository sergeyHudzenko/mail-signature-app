<template>
  <div id="app">
    <link rel="stylesheet" href="//fonts.googleapis.com/css?family=Roboto:400,500,700,400italic|Material+Icons">
    <router-view></router-view>
    <Notification />
  </div>
</template>

<script>

import Notification from '@/components/notification/Notification.vue';
export default {
  name: 'App',
  components: {
      Notification,
    },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>

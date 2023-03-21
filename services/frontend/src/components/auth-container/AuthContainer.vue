<template>
  <div class="login-page">
    321
    <transition name="fade">
      <div v-if="!registerActive" class="wallpaper-login"></div>
    </transition>
    <div class="wallpaper-register"></div>
    <div class="container">
      <router-view class="content"></router-view>
    </div>
  </div>
</template>

<script src="./auth-container.js"></script>

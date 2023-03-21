<template>
  <div
    v-if="isVisible"
    position="10px right"
    class='small-notification notification-wrapper'
  >
    <div
      class="my-notification py-3 px-5"
      :class="item.type"
    >
      <p class="d-flex align-center">
        <span class="ml-2">
          {{ item.text }}
        </span>
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .notification-wrapper {
    position: fixed;
    z-index: 1000;
  }

  .large-notification {
    top: -10px;
    right: 0;
  }
  .small-notification {
    width: 375px;
    top: 5px;
    right: 15px;
  }
  .my-notification {
    right: 0;
    padding: 0;
    margin: 10px 0 0 0;
    color: #ffffff;
    background: #44a4fc;

    &.warn {
      background: #ffb648;
    }

    &.error {
      background: #e54d42;
    }

    &.success {
      background: green;
    }
  }
</style>

<script src="./notification.js"></script>

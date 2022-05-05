<template>
  <div class="container">
    <router-view v-slot="{ Component, route }">
      <transition name="route" mode="out-in">
        <div :key="route">
          <keep-alive>
            <component :is="Component"></component>
          </keep-alive>
        </div>
      </transition>
    </router-view>
  </div>
</template>
<style scoped>
.route-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}
.route-enter-active {
  transition: all 0.4s ease;
}
.route-enter-to {
  opacity: 1;
  transform: translateY(0);
}
.route-leave-from {
  opacity: 1;
}
.route-leave-active {
  transition: all 0.4s ease;
}
.route-leave-to {
  opacity: 0;
}
</style>

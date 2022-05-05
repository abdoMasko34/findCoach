<template>
  <div class="card">
    <slot></slot>
  </div>
</template>
<style scoped>
.card {
  padding: 10px;
  width: 60%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 20px;
  box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.12);
}
</style>

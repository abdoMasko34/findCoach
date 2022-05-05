<template>
  <div class="spinner">
    <div></div>
  </div>
</template>
<style scoped>
.spinner {
  display: flex;
  justify-content: center;
  align-items: center;
}
.spinner div {
  margin: 0 4px;
  width: 40px;
  height: 40px;
  background-color: transparent;
  border: 3px solid rgb(136, 3, 92);
  border-radius: 50%;
  animation-name: spinner;
  animation-duration: 0.4s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  border-left-color: transparent;
}
@keyframes spinner {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>

<template>
  <button v-if="!link" :class="mode">
    <slot></slot>
  </button>
  <router-link v-else :to="to" :class="mode">
    <slot></slot>
  </router-link>
</template>
<script>
export default {
  props: {
    mode: {
      type: String,
      required: false,
      default: null,
    },
    link: {
      type: Boolean,
      required: false,
      default: false,
    },
    to: {
      type: String,
      required: false,
      default: '/',
    },
  },
};
</script>
<style scoped>
a,
button {
  border-radius: 20px;
  padding: 8px 12px;
}
.flat {
  background-color: var(--btn-color);
  color: white;
  border: 1px solid var(--btn-color);
}
.outline {
  border: 1px solid var(--btn-color);
  color: var(--btn-color);
  background-color: transparent;
  outline: none;
}
.flat:hover,
.flat:active {
  background-color: #fff;
  color: var(--btn-color);
  border: 1px solid var(--btn-color);
}
.outline:active,
.outline:hover {
  background-color: rgba(233, 37, 168, 0.2);
  color: #fff;
}
</style>

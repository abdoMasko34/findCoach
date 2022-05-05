<template>
  <span class="badge" :class="type">
    {{ text }}
  </span>
</template>
<script>
export default {
  props: ['title', 'type'],
  computed: {
    text() {
      return this.title.toUpperCase();
    },
  },
};
</script>
<style scoped>
.badge {
  color: #fff;
  padding: 6px 10px;
  margin: 0 10px;
  border-radius: 20px;
  font-size: 1rem;
  font-weight: 500;
}
.frontend {
  background-color: rgba(81, 5, 126, 0.884);
}
.backend {
  background-color: rgba(87, 5, 194, 0.829);
}
.career {
  background-color: rgba(0, 19, 190, 0.884);
}
</style>

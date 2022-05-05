<template>
  <base-card>
    <a :href="emailLink">{{ email }}</a>
    <p>{{ message }}</p>
  </base-card>
</template>
<script>
export default {
  props: ['email', 'message', 'id'],
  computed: {
    emailLink() {
      return 'mailto:' + this.email;
    },
  },
};
</script>
<style scoped>
a {
  font-size: 1.5rem;
  font-weight: 600;
  color: rgb(0, 111, 238);
}
</style>

<template>
  <the-navbar></the-navbar>
  <the-dashboard></the-dashboard>
</template>
<script>
import TheNavbar from './components/Layout/TheNavbar.vue';
import TheDashboard from './components/Layout/TheDashboard.vue';
export default {
  components: {
    TheNavbar,
    TheDashboard,
  },
  computed: {
    didAutoLogout() {
      return this.$store.getters.didAutoLogout;
    },
  },
  created() {
    this.$store.dispatch('autoLogin');
  },
  watch: {
    didAutoLogout(curVal, oldVal) {
      if (curVal && curVal !== oldVal) {
        this.$router.replace('/coaches');
      }
    },
  },
};
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap');
#app {
  font-family: 'Roboto', sans-serif;
}
.navbar {
  background-color: var(--btn-color);
}
.navbar-brand {
  text-transform: capitalize;
}
</style>

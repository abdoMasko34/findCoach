<template>
  <div class="navbar navbar-expand-lg navbar-light">
    <div class="container">
      <h1 class="navbar-brand text-white" @click="gotoCoach">find a coach</h1>
      <ul class="navbar-nav">
        <li class="nav-item">
          <router-link class="nav-link" to="/coaches">
            all coaches
          </router-link>
        </li>
        <li class="nav-item" v-if="isLoggedIn">
          <router-link class="nav-link" to="/request"> requests </router-link>
        </li>
        <li v-else class="nav-item">
          <router-link to="/auth" class="nav-link">Login</router-link>
        </li>
        <li class="nav-item" v-if="isLoggedIn">
          <base-button mode="flat" @click="logout">Logout</base-button>
        </li>
      </ul>
    </div>
  </div>
</template>
<style scoped>
a:active,
a:hover,
a.router-link-active {
  border: 1px solid #fff;
  color: #fff !important;
}
</style>
<script>
export default {
  computed: {
    isLoggedIn() {
      return this.$store.getters.isAuthenticated;
    },
  },
  methods: {
    gotoCoach() {
      this.$router.push('/coaches');
    },
    logout() {
      this.$store.dispatch('logout');
      this.$router.replace('/coaches');
    },
  },
};
</script>

<template>
  <div>
    <base-card class="p-3">
      <h2>{{ fullName }}</h2>
      <h3>{{ rate }}$ <span class="text-primary">/hour</span></h3>
    </base-card>
  </div>
  <div>
    <base-card>
      <header class="p-3">
        <h2>Intersted ? Reach out now</h2>
        <base-button link :to="contactLink" mode="flat">contact</base-button>
      </header>
      <router-view></router-view>
    </base-card>
    <base-card class="p-3">
      <div class="d-flex justify-content-around align-items-center">
        <base-badge
          v-for="area in areas"
          :key="area"
          :type="area"
          :title="area"
        ></base-badge>
      </div>
      <p class="lead text-center mt-3">{{ description }}</p>
    </base-card>
  </div>
</template>
<script>
export default {
  props: ['id'],
  data() {
    return {
      selectCoach: null,
    };
  },
  computed: {
    contactLink() {
      return this.$route.path + '/contact';
    },
    fullName() {
      return this.selectCoach.firstName + ' ' + this.selectCoach.lastName;
    },
    rate() {
      return this.selectCoach.rate;
    },
    description() {
      return this.selectCoach.description;
    },
    areas() {
      return this.selectCoach.areas;
    },
  },
  created() {
    this.selectCoach = this.$store.getters['coach/theCoaches'].find(
      (coach) => coach.id === this.id
    );
  },
};
</script>

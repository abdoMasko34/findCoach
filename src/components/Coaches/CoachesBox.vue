<template>
  <div class="coach-box">
    <h2 class="coach-box-title">{{ fullName }}</h2>
    <h3 class="coach-box-price">{{ rate }}$/<span>hour</span></h3>
    <div class="sections d-flex justify-content-center align-items-center">
      <base-badge
        v-for="area in areas"
        :key="area"
        :type="area"
        :title="area"
      ></base-badge>
    </div>
    <div class="buttons">
      <base-button link :to="coachContactLink" mode="outline">
        Contact
      </base-button>
      <base-button link :to="coachDetailLink" mode="flat">
        View Details
      </base-button>
    </div>
  </div>
</template>
<script>
export default {
  props: ['id', 'firstName', 'lastName', 'rate', 'areas'],
  computed: {
    fullName() {
      return this.firstName + ' ' + this.lastName;
    },
    coachContactLink() {
      return this.$route.path + '/' + this.id + '/contact';
    },
    coachDetailLink() {
      return this.$route.path + '/' + this.id;
    },
  },
};
</script>

<style scoped>
.buttons {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.buttons button {
  margin-left: 10px;
}
</style>

<template>
  <base-modal :show="!!error" title="a Request error" @close="handelError">
    <p>{{ error }}</p>
  </base-modal>
  <div class="box">
    <h2>Recived requests</h2>
    <base-spinner v-if="isLoading"></base-spinner>
    <ul v-if="hasRequest">
      <request-box
        v-for="request in requests"
        :key="request.id"
        :id="request.id"
        :email="request.email"
        :message="request.message"
      ></request-box>
    </ul>
    <p v-else class="text-danger">You Don't have any requests</p>
  </div>
</template>
<script>
import RequestBox from './RequestBox.vue';
export default {
  components: {
    RequestBox,
  },
  data() {
    return {
      error: null,
      isLoading: false,
    };
  },
  computed: {
    requests() {
      return this.$store.getters['request/requests'];
    },
    hasRequest() {
      return this.$store.getters['request/hasRequest'];
    },
  },
  created() {
    this.loadRequests();
  },
  methods: {
    async loadRequests() {
      this.isLoading = true;
      try {
        await this.$store.dispatch('request/fetchRequest');
      } catch (error) {
        this.error = error.message || 'something Went Wrong!!';
        throw error;
      }
      this.isLoading = false;
    },
    handelError() {
      this.error = null;
    },
  },
};
</script>
<style scoped>
h2 {
  text-align: center;
}
.box {
  padding: 10px;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 20px;
  box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.12);
  border-radius: 15px;
}
</style>

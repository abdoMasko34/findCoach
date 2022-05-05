<template>
  <base-modal :show="!!error" title="An Error accured" @close="handelError">
    <p>{{ error }}</p>
  </base-modal>
  <coach-filter @change-filter="filterAreas"></coach-filter>
  <base-card>
    <div class="d-flex justify-content-between align-items-center">
      <base-button mode="outline" @click="loadCoaches(true)"
        >refresh</base-button
      >
      <base-button
        link
        to="/register"
        mode="flat"
        v-if="isLoggedIn && !isCoach && !isLoading"
      >
        register a coach
      </base-button>
      <base-button
        to="/auth?redirect=register"
        mode="flat"
        v-if="!isLoggedIn"
        link
        >Login or register</base-button
      >
    </div>
    <base-spinner v-if="isLoading"> </base-spinner>
    <ul v-else-if="hasCoaches">
      <coaches-box
        v-for="coach in coaches"
        :key="coach.id"
        :id="coach.id"
        :first-name="coach.firstName"
        :last-name="coach.lastName"
        :rate="coach.rate"
        :areas="coach.areas"
      ></coaches-box>
    </ul>
    <h3 v-else>No Coaches been Found</h3>
  </base-card>
</template>

<script>
import CoachesBox from './CoachesBox.vue';
import CoachFilter from './CoachFilter.vue';
export default {
  components: {
    CoachesBox,
    CoachFilter,
  },
  data() {
    return {
      error: null,
      isLoading: false,
      activeFilters: {
        frontend: true,
        backend: true,
        career: true,
      },
    };
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isAuthenticated;
    },
    coaches() {
      const coaches = this.$store.getters['coach/theCoaches'];
      return coaches.filter((coach) => {
        if (this.activeFilters.frontend && coach.areas.includes('frontend')) {
          return true;
        }
        if (this.activeFilters.backend && coach.areas.includes('backend')) {
          return true;
        }
        if (this.activeFilters.career && coach.areas.includes('career')) {
          return true;
        }
        return false;
      });
    },
    hasCoaches() {
      return !this.isLoading && this.$store.getters['coach/hasCoaches'];
    },
    isCoach() {
      return this.$store.getters['coach/isCoach'];
    },
  },
  created() {
    this.loadCoaches();
  },
  methods: {
    filterAreas(updatedFilters) {
      this.activeFilters = updatedFilters;
    },
    async loadCoaches(refresh = false) {
      this.isLoading = true;
      try {
        await this.$store.dispatch('coach/loadCoaches', {
          forceRefresh: refresh,
        });
      } catch (error) {
        this.error = error.message || 'SomeThing Went Wrong';
      }
      this.isLoading = false;
    },
    handelError() {
      this.error = null;
    },
  },
};
</script>

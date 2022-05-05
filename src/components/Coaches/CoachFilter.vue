<template>
  <base-card>
    <h3 class="card-title">find your coach</h3>
    <form class="d-flex">
      <div>
        <input type="checkbox" id="frontend" checked @change="setFilters" />
        <label for="frontend">FrontEnd</label>
      </div>
      <div>
        <input type="checkbox" id="backend" checked @change="setFilters" />
        <label for="backend">BackEnd</label>
      </div>
      <div>
        <input type="checkbox" id="career" checked @change="setFilters" />
        <label for="career">Career</label>
      </div>
    </form>
  </base-card>
</template>
<script>
export default {
  emits: ['change-filter'],
  data() {
    return {
      filters: {
        frontend: true,
        backend: true,
        career: true,
      },
    };
  },
  methods: {
    setFilters(event) {
      const inputId = event.target.id;
      const isActive = event.target.checked;
      const updatedFilters = {
        ...this.filters,
        [inputId]: isActive,
      };
      this.filters = updatedFilters;
      this.$emit('change-filter', updatedFilters);
    },
  },
};
</script>

<style scoped>
.d-flex {
  justify-content: center;
  align-items: center;
}
.d-flex div {
  margin-right: 25px;
}
.d-flex div input {
  margin-right: 4px;
}
.card .card-title {
  font-size: 1.8rem;
  font-weight: 700;
  text-transform: capitalize;
}
</style>

<template>
  <base-card>
    <h2>Register as Coach</h2>
    <form @submit.prevent="submitData">
      <div class="form-group" :class="{ inValid: !enterdFirstName.isValid }">
        <label for="fName">First Name</label>
        <input
          type="text"
          class="form-control"
          id="fName"
          v-model.trim="enterdFirstName.val"
          @blur="clearValidity('enterdFirstName')"
        />
      </div>
      <div class="form-group" :class="{ inValid: !enterdLastName.isValid }">
        <label for="lName">Last Name</label>
        <input
          type="text"
          class="form-control"
          id="lName"
          v-model.trim="enterdLastName.val"
          @blur="clearValidity('enterdLastName')"
        />
      </div>
      <div class="form-group" :class="{ inValid: !enterdDescrition.isValid }">
        <label for="description">Description</label>
        <textarea
          v-model.trim="enterdDescrition.val"
          name="description"
          id="description"
          class="form-control"
          @blur="clearValidity('enterdDescrition')"
        ></textarea>
      </div>
      <div class="form-group" :class="{ inValid: !enterdRate.isValid }">
        <label for="rate">hourly rate</label>
        <input
          type="number"
          class="form-control"
          id="rate"
          v-model.number="enterdRate.val"
          @blur="clearValidity('enterdRate')"
        />
      </div>
      <div class="d-flex">
        <div>
          <input
            type="checkbox"
            id="frontend"
            v-model="areas.val"
            value="frontend"
            :class="{ inValid: !areas.isValid }"
            @blur="clearValidity('areas')"
          />
          <label for="frontend">Frontend</label>
        </div>
        <div>
          <input
            type="checkbox"
            id="backend"
            v-model="areas.val"
            value="backend"
            :class="{ inValid: !areas.isValid }"
            @blur="clearValidity('areas')"
          />
          <label for="backend">backend</label>
        </div>
        <div>
          <input
            type="checkbox"
            id="career"
            v-model="areas.val"
            value="career"
            :class="{ inValid: !areas.isValid }"
            @blur="clearValidity('areas')"
          />
          <label for="career">career</label>
        </div>
      </div>
      <p v-if="!formIsValid" class="text-danger">
        plase fill these filed to register!
      </p>
      <base-button mode="flat">Register</base-button>
    </form>
  </base-card>
</template>
<script>
export default {
  data() {
    return {
      enterdFirstName: {
        val: '',
        isValid: true,
      },
      enterdLastName: {
        val: '',
        isValid: true,
      },
      enterdDescrition: {
        val: '',
        isValid: true,
      },
      enterdRate: {
        val: null,
        isValid: true,
      },
      areas: {
        val: [],
        isValid: true,
      },
      formIsValid: true,
    };
  },
  methods: {
    clearValidity(input) {
      this[input].isValid = true;
    },
    validateForm() {
      this.formIsValid = true;
      if (this.enterdFirstName.val === '') {
        this.enterdFirstName.isValid = false;
        this.formIsValid = false;
      }
      if (this.enterdLastName.val === '') {
        this.enterdLastName.isValid = false;
        this.formIsValid = false;
      }
      if (this.enterdDescrition.val === '') {
        this.enterdDescrition.isValid = false;
        this.formIsValid = false;
      }
      if (!this.enterdRate.val || this.enterdRate.val < 0) {
        this.enterdRate.isValid = false;
        this.formIsValid = false;
      }
      if (this.areas.val.length === 0) {
        this.areas.isValid = false;
        this.formIsValid = false;
      }
    },
    submitData() {
      this.validateForm();
      if (!this.formIsValid) {
        return;
      }
      const submitedData = {
        fName: this.enterdFirstName.val,
        lName: this.enterdLastName.val,
        desc: this.enterdDescrition.val,
        rate: this.enterdRate.val,
        areas: this.areas.val,
      };
      this.$store.dispatch('coach/registerCoach', submitedData);
      this.$router.replace('/coaches');
    },
  },
};
</script>
<style scoped>
textarea {
  resize: none;
}
.form-group {
  margin-top: 10px;
  margin-bottom: 10px;
}
button {
  margin-top: 10px;
}
.d-flex {
  justify-content: space-around;
}
.d-flex label {
  margin-left: 10px;
}
.inValid input,
.inValid textarea {
  border: 2px solid rgba(255, 0, 0, 0.7);
  outline: none;
  box-shadow: none;
}
.inValid label {
  color: rgba(255, 0, 0, 0.7);
}
input[type='checkbox']:focus {
  outline: rgba(2, 96, 184, 0.7);
}
input[type='checkbox'].inValid + label {
  color: rgba(255, 0, 0, 0.7);
}
</style>

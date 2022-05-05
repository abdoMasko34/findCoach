<template>
  <div class="box">
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="email">Email</label>
        <input
          type="email"
          placeholder="email"
          class="form-control"
          v-model.trim="emailAddress"
        />
      </div>
      <div class="form-group">
        <label for="message">Message</label>
        <textarea
          name="message"
          id="message"
          cols="30"
          rows="10"
          class="form-control"
          v-model.trim="message"
        ></textarea>
      </div>
      <p v-if="!formIsValid" class="text-danger">
        Please Valid the email or fill the email field
      </p>
      <base-button class="btn btn-pink mt-2" mode="flat"
        >Send Request</base-button
      >
    </form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      emailAddress: '',
      message: '',
      formIsValid: true,
    };
  },
  methods: {
    submitForm() {
      this.formIsValid = true;
      if (
        this.emailAddress === '' ||
        !this.emailAddress.includes('@') ||
        this.message === ''
      ) {
        this.formIsValid = false;
        return;
      }
      this.$store.dispatch('request/contactCoach', {
        email: this.emailAddress,
        message: this.message,
        coachId: this.$route.params.id,
      });
      this.$router.replace('/coaches');
    },
  },
};
</script>
<style scoped>
textarea {
  resize: none;
  height: 100px;
}
div .form-group {
  margin-top: 10px;
}
label {
  font-size: 1.2rem;
  font-weight: 600px;
}
</style>

<template>
  <div>
    <base-modal :show="!!error" title="an error accoured" @close="handelError">
      <p>{{ error }}</p>
    </base-modal>
    <base-modal :show="isLoading" title="Authenticating">
      <base-spinner v-if="isLoading"></base-spinner>
    </base-modal>
    <base-card>
      <form @submit.prevent="submitLoginData">
        <div class="form-group">
          <label for="email">E-mail</label>
          <input
            type="email"
            placeholder="email"
            v-model.trim="email"
            class="form-control my-3"
          />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input
            type="password"
            class="form-control my-3"
            placeholder="password"
            v-model.trim="password"
          />
        </div>
        <p v-if="!formIsValid">Please Validate fill the forms</p>
        <base-button class="mx-2" mode="flat">{{
          submitButtonCaption
        }}</base-button>
        <base-button mode="outline" type="button" @click="switchAuthMode">{{
          switchModeButtonCaption
        }}</base-button>
      </form>
    </base-card>
  </div>
</template>
<script>
import BaseSpinner from '../UI/BaseSpinner.vue';
export default {
  components: { BaseSpinner },
  data() {
    return {
      email: '',
      password: '',
      formIsValid: true,
      mode: 'login',
      isLoading: false,
      error: null,
    };
  },
  computed: {
    submitButtonCaption() {
      if (this.mode == 'login') {
        return 'Login';
      } else {
        return 'signup';
      }
    },
    switchModeButtonCaption() {
      if (this.mode == 'login') {
        return 'SignUp instead';
      } else {
        return 'Login Instead';
      }
    },
  },
  methods: {
    async submitLoginData() {
      if (
        this.email === '' ||
        !this.email.includes('@') ||
        this.password === ''
      ) {
        this.formIsValid = false;
        return;
      }
      this.isLoading = true;
      const actionPayload = {
        email: this.email,
        password: this.password,
      };
      try {
        if (this.mode === 'login') {
          await this.$store.dispatch('login', actionPayload);
        } else {
          await this.$store.dispatch('singup', actionPayload);
        }
        const redirectUrl = '/' + (this.$route.query.redirect || 'coaches');
        this.$router.replace(redirectUrl);
      } catch (err) {
        this.error = err.message || 'Faild to Authenticate.. try later';
      }
      this.isLoading = false;
    },
    switchAuthMode() {
      if (this.mode === 'login') {
        this.mode = 'signup';
      } else {
        this.mode = 'login';
      }
    },
    handelError() {
      this.error = null;
    },
  },
};
</script>

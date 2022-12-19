<template>
  <div class='registration-form'>
    <form class='registration-form-content' @submit.prevent>
      <div class='row'>
        <label class='registration-label' for='emailField'>Email</label>
        <input class='registration-input'
               type='email'
               id='emailField'
               name='emailField'
               placeholder='example@ex.com'
               v-model='email'>
      </div>
      <div class='row'>
        <label class='registration-label' for='passwordField'>Password</label>
        <input class='registration-input'
               type='password'
               id='passwordField'
               name='passwordField'
               placeholder='password'
               v-model='password'>
      </div>
      <div class='row'>
        <label class='registration-label' for='confirmPasswordField'>Password confirmation</label>
        <input class='registration-input'
               type='password'
               id='confirmPasswordField'
               name='confirmPasswordField'
               placeholder='password'
               v-model='confirmPassword'>
      </div>
      <div class='btn-container'>
        <app-button @click='registration'>Submit</app-button>
        <app-button :buttonType='"reset"'>Cancel</app-button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import store from '@/store/store';
export default {
  components: {},
  data() {
    return {
      email: '',
      password: '',
      confirmPassword: ''
    }
  },
  methods: {
    async registration() {
      if (this.isPasswordsValid) {
        store.dispatch('registration', {
          email: this.email,
          password: this.password
        }).then(() => {
          this.email = '';
          this.password = '';
          this.confirmPassword = '';
        }).catch(e => console.log(e.response?.data?.message));
      }
    }
  },
  computed: {
    isPasswordsValid() {
      return this.password.length > 8 && this.password == this.confirmPassword;
    }
  }

};
</script>

<style scoped lang='scss'>
.registration-form {
  position: relative;
  display: flex;
  justify-content: center;
  margin-top: 100px;
}
.registration-form-content {
  padding: 10px;
  min-width: 600px;
  height: 100%;
  display: flex;
  flex-direction: column;
  border: 1px solid lightslategray;
  input {
    width: 100%;
  }
}
.row {
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 15px;
}
.registration-label {
  margin-right: 20px;
}
.btn-container {
  margin: 10px;
}
</style>
<template>
  <b-container class="login-container">
    <b-row class="justify-content-center">
      <b-col md="6" lg="4">
        <b-card bg-variant="light"  style="background-color:orange;border-color:orange" class="login-card">
          <b-form @submit.prevent="login">
            <b-form-group label="Email">
              <b-form-input v-model="email" type="email" required></b-form-input>
            </b-form-group>
            <b-form-group label="Password">
              <b-form-input v-model="password" type="password" required></b-form-input>
            </b-form-group>
            <b-button type="submit" style="background-color:orange" class="btn-block">Login</b-button>
            <b-button @click="goToSignUp" variant=" sucess" class="btn-block ">Sign Up</b-button>
            <b-button @click="goToResetPassword"  class="btn-block">Forgot Password?</b-button>
          </b-form>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { auth } from '../../firebase';
import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';


export default {
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    async login() {
      try {
        await auth.signInWithEmailAndPassword(this.email, this.password);
        Toastify({
        text: "Successful",
        duration: 3000,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        backgroundColor: "green",
      }).showToast();
              this.$router.push('/');

      } catch (error) {
        Toastify({
        text: "Password Incorrect",
        duration: 3000,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        backgroundColor: "red",
      }).showToast();
      }
    },
    goToSignUp() {
      this.$router.push('/signup');
    },
    goToResetPassword() {
      this.$router.push('/reset-password');
    }
  }
};
</script>

<style scoped>
.login-container {
  margin-top: 100px;
}
.login-card {
  padding: 20px;
  border-width: 2px;
}
.btn-block {
  width: 100%;
}
</style>
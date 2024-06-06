<template>
  <Navbar />
  <b-container class="reset-password-container">
    <b-row class="justify-content-center">
      <b-col md="6" lg="4">
        <b-card bg-variant="light" text-variant="dark" class="reset-password-card">
          <b-form @submit.prevent="resetPassword">
            <b-form-group label="Email">
              <b-form-input v-model="email" type="email" required></b-form-input>
            </b-form-group>
            <b-button type="submit" variant="success" class="btn-block">Reset Password</b-button>
          </b-form>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import Navbar from "@/components/Layout/NavBar.vue";

import { auth } from '../../firebase';

export default {
  components: { Navbar },
  data() {
    return {
      email: ''
    };
  },
  methods: {
    async resetPassword() {
      try {
        await auth.sendPasswordResetEmail(this.email);
        alert('Password reset email sent');
        this.$router.push('/login');
      } catch (error) {
        alert(error.message);
      }
    }
  }
};

</script>

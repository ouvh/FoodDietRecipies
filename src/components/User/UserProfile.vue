<template>
  <b-container class="profile-container">
    <b-row class="justify-content-center">
      <b-col md="6" lg="4">
        <b-card bg-variant="light" text-variant="dark" class="profile-card">
          <b-card-title>User Profile</b-card-title>
          <b-card-text>
            <p><strong>Name:</strong> {{ user.displayName }}</p>
            <p><strong>Email:</strong> {{ user.email }}</p>
          </b-card-text>
          <b-button @click="editProfile" variant="success" class="btn-block">Edit Profile</b-button>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { auth } from '../../firebase';

export default {
  data() {
    return {
      user: null
    };
  },
  created() {
    this.user = auth.currentUser;
  },
  methods: {
    editProfile() {
      this.$router.push('/edit-profile');
    }
  }
};
</script>

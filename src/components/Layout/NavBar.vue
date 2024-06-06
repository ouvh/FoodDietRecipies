<template>
  <b-navbar
    toggleable="lg"
    type="dark"
    class="fixed-top-with-margin fixed-top"
    style="background-color:orange"
  >
    <b-navbar-brand href="/">Food Recipes</b-navbar-brand>
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item to="/">Home</b-nav-item>
        <b-nav-item to="/AllCategories">Recipes</b-nav-item>

      </b-navbar-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-item v-if="!user" to="/login">Login</b-nav-item>
        <b-nav-item v-if="!user" to="/signup">Sign Up</b-nav-item>
        <b-nav-item v-if="user" to="/profile">Profile</b-nav-item>
        <b-nav-item v-if="user" to="/create-discussion">Add new recipe</b-nav-item>
        <b-nav-item v-if="user" @click="logout">Logout</b-nav-item>
      </b-navbar-nav>
    </b-collapse>

    
  </b-navbar>


</template>

<script>
import { auth } from "../../firebase";

export default {
  data() {
    return {
      user: null,
    };
  },
  created() {
    auth.onAuthStateChanged((user) => {
      this.user = user;
    });
  },
  methods: {
    logout() {
      auth.signOut();
      this.$router.push('/')
    },
  },
};
</script>

<style>
.fixed-top-with-margin {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1030;
  margin-bottom: 1rem;
}
body {
  padding-top: 50px;
}
</style>

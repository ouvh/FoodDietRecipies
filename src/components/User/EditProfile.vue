<template>
  <Navbar />

  <b-container class="update-profile-container">
    <b-row class="justify-content-center">
      <b-col md="6" lg="4">
        <b-card
          bg-variant="light"
          text-variant="dark"
          class="update-profile-card"
        >
          <b-form @submit.prevent="updateProfile">
            <b-form-group label="Name">
              <b-form-input v-model="name" required></b-form-input>
            </b-form-group>
            <b-button type="submit" variant="success" class="btn-block"
              >Update Profile</b-button
            >
          </b-form>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import Navbar from "@/components/Layout/NavBar.vue";
import { auth, db } from "../../firebase";

export default {
  components: { Navbar },
  data() {
    return {
      name: auth.currentUser.displayName || "",
    };
  },
  methods: {
    async updateProfile() {
      const user = auth.currentUser;
      await user.updateProfile({ displayName: this.name });
      await db.collection("users").doc(user.uid).update({ name: this.name });
      this.$router.push("/profile");
    },
  },
};
</script>

<style scoped>
.update-profile-container {
  background-color: #f8f9fa;
padding: 50px;
  align-items: center;
}
.update-profile-card {
  padding: 20px;
  border-width: 2px;
}
.btn-block {
  width: 100%;
}
</style>

<template>
  <div>
    <Navbar />
    <SignUp />
  </div>
</template>

<script>
import Navbar from '../components/Layout/NavBar.vue';
import SignUp from '../components/Auth/SignUp.vue';

export default {
  components: { Navbar, SignUp }
};
</script>

<template>
    <Navbar />
  <h1 class="op">Cook It and Have Fun</h1>
  <div class="ppp">
    <Login />
  </div>
   

</template>

<script>
import Navbar from '../components/Layout/NavBar.vue';
import Login from '../components/Auth/LoginC.vue';

export default {
  components: { Navbar, Login }
};
</script>

<style scoped>
.ppp {
  background-image: url("https://wallpaperaccess.com/full/767093.jpg");
  backdrop-filter: blur(20px) saturate(180%);
  background-size: cover;
  background-position: center;
  height: 100%;
  align-items: center;
  justify-content: center;
  
}
.op{
  margin-top:50px;
  font-weight: 1000;
  color: orange;
}
</style>

<template>
  <div>
    <Navbar />


    <div class="ppp">
      <div class="title-container">
        <div class="ook">
          <h1>Cook what you love</h1>
        </div>
      </div>
    </div>

   



    <b-container>
      <b-row>
        <b-col>
          <DiscussionList />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Navbar from "../components/Layout/NavBar.vue";
import DiscussionList from "../components/Discussion/DiscussionList.vue";

export default {
  components: { Navbar, DiscussionList },
};
</script>

<style scoped>
.ooo{
  width: 100%;
}
.ppp {
  background-image: url("https://wallpaperaccess.com/full/767093.jpg");
  backdrop-filter: blur(20px) saturate(180%);
  background-size: cover;
  background-position: center;
  height: 400px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  
}
.ook{
    backdrop-filter: blur(15px) saturate(180%);
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    height:100px;
    padding-right: 50px;
    padding-left: 50px;



}

.title-container {
  text-align: center;
  color: white;
  font-size: 3rem; /* Adjust the font size as needed */
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
}

.title {
  margin: 0;
}
</style>

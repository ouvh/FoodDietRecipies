<template>
  <div>
    <Navbar />
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

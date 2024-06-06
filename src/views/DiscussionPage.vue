<template>
  <div>
    <Navbar />
    <DiscussionDetail />
  </div>
</template>

<script>
import Navbar from '../components/Layout/NavBar.vue';
import DiscussionDetail from '../components/Discussion/DiscussionDetail.vue';

export default {
  components: { Navbar, DiscussionDetail }
};
</script>

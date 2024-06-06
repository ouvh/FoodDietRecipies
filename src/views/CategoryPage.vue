<template>
  <div>
    <Navbar />
    <b-container>
      <b-row>
        <b-col>
          <DiscussionListCategory :tag="$route.params.tag" />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Navbar from '../components/Layout/NavBar.vue';
import DiscussionListCategory from '../components/Discussion/DiscussionListCategory.vue';

export default {
  components: { Navbar, DiscussionListCategory }
};
</script>

<template>
  <b-container class="my-3">
    <b-row class="justify-content-center">
      <b-col cols="12" md="8" lg="6">
        <b-input-group>
          <b-form-input
            v-model="searchQuery"
            placeholder="Search..."
            @keydown="searchPosts"
          ></b-form-input>
          <b-input-group-append>
            <b-button variant="secondary" @click="searchPosts">Search</b-button>
          </b-input-group-append>
        </b-input-group>
      </b-col>
    </b-row>
  </b-container>

  <b-container v-if="!loading">

    <b-row >

      <b-col
  v-for="discussion in filteredDiscussions"
  :key="discussion.id"
  cols="4"
>
  <b-card style="background-color:orange;height:400px;overflow:hidden;overflow:scroll" text-variant="white" class="mb-3 uuu  rounded">
    <!-- Add the image here -->
    <b-card-img
      :src="discussion.image_link"
      alt="Card image"
      class="custom-img"
      style="width:100%"
    ></b-card-img>
    
    <b-card-header
      class="d-flex flex-wrap justify-content-between align-items-center"
    >
      <h5 class="mb-0">{{ discussion.title }}</h5>
      <div class="created-by text-light">
        <b-badge variant="light" class="text-dark font-weight-bold p-3">
          Posted by: {{ discussion.username }}
        </b-badge>
      </div>
    </b-card-header>

    
    <b-card-body>
      <b-card-text>{{ truncateContent(discussion.content) }}</b-card-text>
      <b-row class="mt-3">
        <b-col cols="12">
          <b-button
            class="oopoinpin"
            style="width:100%"
            @click="viewDiscussion(discussion.id)"
            >View</b-button
          >
        </b-col>
        <b-col>
          <div class="tags mt-3">
            <b-badge
              v-for="(tag, index) in discussion.tags"
              :key="index"
              variant="light"
              class="tag-badge"
              @click.prevent="this.$router.push('/recepies/' + tag)"
            >
              {{ tag }}
            </b-badge>
          </div>
        </b-col>
      </b-row>
    </b-card-body>

  </b-card>


</b-col>


      
    </b-row>

  </b-container>

  <div v-if="loading" class="loading-page">
    <div class="loading-container">
      <div class="loading-text">Loading, please wait...</div>
      <b-progress :value="progress" max="100" class="loading-bar"></b-progress>
    </div>
  </div>

  
</template>

<script>
import { db } from "../../firebase";

export default {
  props: ["categoryId"],
  data() {
    return {
      discussions: [],
      loading: true,
      progress: 0,
      searchQuery: "",
      filteredDiscussions: [],
    };
  },
  async created() {
    try {
      const query = await db.collection("discussions");
      const snapshot = await query.orderBy("createdAt", "desc").get();
      

      this.progress += 30;
      this.discussions = [];

      for (const doc of snapshot.docs) {
        this.progress += parseInt((70)/snapshot.docs.length)
        const discussion = { id: doc.id, ...doc.data() };
        const userSnapshot = await db
          .collection("users")
          .doc(discussion.author)
          .get();
        if (userSnapshot.exists) {
          discussion.username = userSnapshot.data().name;
        } else {
          discussion.username = "Unknown";
        }
        this.discussions.push(discussion);
      }
      this.filteredDiscussions = this.discussions;
    } catch (error) {
      console.error("Error fetching discussions or users:", error);
    }
    console.log("iriririr")
    console.log(this.discussions)
    console.log("iriririr")

    this.loading = false;
  },
  methods: {
    viewDiscussion(id) {
      this.$router.push(`/discussion/${id}`);
    },
    truncateContent(content) {
      const limit = 100;
      if (content.length > limit) {
        return content.substring(0, limit) + "...";
      }
      return content;
    },
    searchPosts() {
      const lowerCaseQuery = this.searchQuery.toLowerCase();

      this.filteredDiscussions = this.discussions.filter((discussion) => {
        const titleMatch = discussion.title
          .toLowerCase()
          .includes(lowerCaseQuery);

        const contentMatch = discussion.content
          .toLowerCase()
          .includes(lowerCaseQuery);

        const tagsMatch = discussion.tags
          ? discussion.tags.some((tag) =>
              tag.toLowerCase().includes(lowerCaseQuery)
            )
          : false;

        return titleMatch || contentMatch || tagsMatch;
      });
      console.log("kjjj");
    },
  },
};
</script>

<style scoped>

.oopoinpin{
  color:black;
  background-color:white;
  border-color: black;
}


::-webkit-scrollbar {
  width: 5px; /* Width of the scrollbar */
  

}

::-webkit-scrollbar-track {
  background: transparent; /* Color of the track */
   
}

::-webkit-scrollbar-thumb {
  background-color: transparent; /* Color of the thumb */
  border-radius: 5px; /* Roundness of the thumb */
transition: background-color 0.1s ease; /* Smooth transition */

}


.uuu:hover::-webkit-scrollbar-thumb {
  background-color: #888; /* Adjust as needed */

}


.custom-img {
  height: 150px; /* Fixed height for the image */
  object-fit: cover; /* Ensure the image covers the specified height without stretching */
  width: 100%; /* Ensure the image takes the full width of the card */
}


.tags {
  display: flex;
  flex-wrap: wrap;
}
.tags .badge {
  cursor: pointer;
}
.created-by {
  color: #f8f9fa !important;
}

.loading-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: rgba(233, 157, 15,0.7);
  color: #f8f9fa;
}


.loading-container {
  text-align: center;
}

.loading-text {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.loading-bar {
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  height: 3px;
}

.loading-bar .progress-bar {
  background-color: #28a745;
}

.tag-badge {
  margin-right: 10px;
  margin-bottom: 10px;
}
</style>

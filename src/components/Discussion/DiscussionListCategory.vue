<template>
  <b-container class="my-3 py-4 bg-light rounded text-center">
    <h2 class="mb-4 font-weight-bold">Search by Diets</h2>

    <div class="">
     

    <b-form-group label="Choose your diet">
      <div class="input-group mb-3">
        <b-form-tags
          label="Choose your diet"
          input-id="tags-remove-on-delete"
          :input-attrs="{ 'aria-describedby': 'tags-remove-on-delete-help' }"
          v-model="diet"
          :tag-validator="onTagState"
          separator=" "
          placeholder="Enter new Diets separated by space"
          remove-on-delete
          no-add-on-enter
          class="flex-grow-1"
        ></b-form-tags>
        <b-dropdown
          id="dropdown-1"
          text="Select Diet"
          class="ml-2"
          style="background-color:orange;border-color:orange"

          v-if="availableDiets.length"
        >
          <b-dropdown-item
            v-for="(option, index) in availableDiets"
            :key="index"
            @click="addDiet(option.value)"
          >
            {{ option.text }}
          </b-dropdown-item>
        </b-dropdown>
      </div>
    </b-form-group>






    </div>


    <b-form-text id="tags-remove-on-delete-help" class="mx-auto">
      Press <kbd>Backspace</kbd> to remove the last tag entered
    </b-form-text>
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
            variant="secondary"
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
  props: ["tag"],
  data() {
    return {
      discussions: [],
      loading: true,
      progress: 0,
      searchQuery: "",
      filteredDiscussions: [],
      diet:[],
      selectedDiets: [], // Array to hold selected diets
     availableDiets: [
        { value: 'omnivore', text: 'Omnivore' },
        { value: 'vegetarian', text: 'Vegetarian' },
        { value: 'vegan', text: 'Vegan' },
        { value: 'pescetarian', text: 'Pescetarian' },
        { value: 'flexitarian', text: 'Flexitarian' },
        { value: 'fruitarian', text: 'Fruitarian' },
        { value: 'raw', text: 'Raw' },
        { value: 'paleo', text: 'Paleo' },
        { value: 'keto', text: 'Keto' },
        { value: 'gluten-free', text: 'Gluten-Free' },
      ],
    };
  },
  async created() {
    if (this.tag) {
      this.diet = [this.tag];
    }

    try {
      const query = this.categoryId
        ? db.collection("discussions").where("category", "==", this.categoryId)
        : db.collection("discussions");
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
      this.searchRelevantDiscussions(["temp"]);
    } catch (error) {
      console.error("Error fetching discussions or users:", error);
    }

    this.loading = false;
  },
  methods: {
    addDiet(diet) {
      if (!this.diet.includes(diet)) {
        this.diet.push(diet);
      }
    },
    onTagState(tag) {
      // Custom validation logic if needed
      return this.availableDiets.some(diet => diet.value === tag) && !this.diet.includes(tag);
    },
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
    searchRelevantDiscussions(newvalue) {
      if (this.diet.length === 0 || newvalue.length === 0) {
        this.filteredDiscussions = this.discussions;
        return;
      }
      const lowerCaseTags = this.diet.map((tag) => tag.toLowerCase());

      const relevantDiscussions = this.discussions.map((discussion) => {
        const matchingTags = discussion.tags
          ? discussion.tags.filter((tag) =>
              lowerCaseTags.includes(tag.toLowerCase())
            ).length
          : 0;
        return { ...discussion, relevance: matchingTags };
      });

      this.filteredDiscussions = relevantDiscussions
        .filter((discussion) => discussion.relevance > 0)
        .sort((a, b) => b.relevance - a.relevance);
    },
  },
  watch: {
    tag(newvalue) {
      if (newvalue) {
        this.diet = [newvalue];
      } else {
        this.diet = [];
      }
    },
    diet: {
      handler(newvalue) {
        this.searchRelevantDiscussions(newvalue);
      },
      deep: true,
    },
  },
};
</script>


<style scoped>


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




<template>
  <b-container v-if="!loading">
    <b-row class="justify-content-center">
      <b-col md="8">
        <b-card class="mb-3 shadow-sm" no-body style="border-radius: 15px; overflow: hidden;">
          


          <b-img :src="discussion.image_link" fluid alt="Image" class="mb-3" style="border-bottom: 5px solid #ff6600;height:500px;  object-fit: cover" />
          <b-card-header class="d-flex justify-content-between align-items-center" style="background-color: #fff; border-bottom: none; padding: 20px;">
            <h5 class="mb-0" style="color: #ff6600;">{{ discussion.title }}</h5>
            <div>
              <b-badge     @click.prevent="this.$router.push('/recepies/' + tag)" v-for="(tag, index) in discussion.tags" :key="index" variant="dark" class="mx-1" style="background-color: #ff6600; color: #fff;cursor:pointer">
                {{ tag }}
              </b-badge>
            </div>
          </b-card-header>


          <b-card-body style="background-color: #fff; padding: 20px;">

         <b-card-body style="background-color: #fff; padding: 20px;">
    <b-card-text>
        <div>
            <p><i class="fas fa-user"></i> <strong>Description:</strong> {{ discussion.content }} qeifonqefinqepfnqpef qfpoqfpoiqpef qfpoqfpoiqpef qfpoqfpoiqpef qfpoqfpoiqpef qfpoqfpoiqpef qfpoqfpoiqpef qfpoqfpoiqf qfoqpenfqenf popi</p>
            <p><i class="far fa-clock"></i> <strong>Created At:</strong> {{ formatDate(discussion.createdAt) }}</p>
        </div>
        <div>
            <p><i class="fas fa-utensils"></i> <strong>Ingredients:</strong></p>
            <ul class="list-unstyled" style="padding-left: 20px;">
                <li v-for="(ingredient, index) in discussion.ingredients" :key="index"><i class="fas fa-check"></i> {{ ingredient }}</li>
            </ul>
        </div>
        <div>
            <p><i class="fas fa-book-open"></i> <strong>Instructions:</strong></p>
            <ol style="padding-left: 20px;">
                <li v-for="(instruction, index) in discussion.instructions" :key="index"><i class="fas fa-angle-right"></i> {{ instruction }}</li>
            </ol>
        </div>
        <p><i class="far fa-clock"></i> <strong>Prep Time:</strong> {{ discussion.prep_time }}</p>
    </b-card-text>
</b-card-body>


          </b-card-body>









        </b-card>
      </b-col>
    </b-row>
  </b-container>





  
</template>

<script>
import { db, auth } from "../../firebase";

export default {
  data() {
    return {
      discussion: {},
      replies: [],
      replyContent: "",
      loading:true
    };
  },
  async created() {
    try {
      const discussionId = this.$route.params.id;
      console.log("i am here")
      console.log(discussionId)

      const discussionDoc = await db
        .collection("discussions")
        .doc(discussionId)
        .get();
      this.discussion = { id: discussionDoc.id, ...discussionDoc.data() };
      this.loading = false

    } catch (error) {
      console.error("Error fetching discussion or replies:", error);
    }
  },
  methods: {
    formatDate(timestamp) {
      console.log(timestamp.seconds)
            const date = new Date(timestamp.seconds * 1000);
            return date.toLocaleString(); // Adjust formatting as needed
        },
    async postReply() {
      const user = auth.currentUser;

      if (user === null) {
        alert("you should be logged in to post");
      } else {
        const newReply = {
          discussionId: this.discussion.id,
          content: this.replyContent,
          author: user.uid,
          createdAt: new Date(),
        };
        await db.collection("replies").add(newReply);
        const userSnapshot = await db.collection("users").doc(user.uid).get();
        if (userSnapshot.exists) {
          newReply.username = userSnapshot.data().name;
        } else {
          newReply.username = "Unknown";
        }
        this.replies.push(newReply);
        this.replyContent = "";
      }
    },
  },
};
</script>





<style scoped>
.discussion-container {
  background-color: #f8f9fa;
  padding: 20px;
}
.discussion-card {
  border-width: 2px;
}
.btn-block {
  width: 100%;
}

.reply-by-text {
  font-style: italic;
  font-weight: bold;
  margin-bottom: 10px;
}

.reply-username {
  color: #000000;
}

.b-card {
  border-radius: 10px;
  padding: 20px;
}

.b-card-text {
  margin-bottom: 10px;
}
</style>

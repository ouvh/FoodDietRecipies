<template>
  <b-container class="discussion-container">
    <b-card bg-variant="light" text-variant="dark" class="discussion-card">
      <b-card-title>{{ discussion.title }}</b-card-title>
      <b-card-text>{{ discussion.content }}</b-card-text>
    </b-card>

    <b-card
      bg-variant="secondary"
      text-variant="white"
      class="mt-3"
      v-for="reply in replies"
      :key="reply.id"
    >
      <b-card-text class="reply-by-text">
        Reply by: <span class="reply-username">{{ reply.username }}</span>
      </b-card-text>
      <b-card-text>{{ reply.content }}</b-card-text>
    </b-card>

    <b-form @submit.prevent="postReply" class="mt-3">
      <b-form-group label="Reply">
        <b-form-textarea v-model="replyContent" required></b-form-textarea>
      </b-form-group>
      <b-button type="submit" variant="success" class="btn-block"
        >Post Reply</b-button
      >
    </b-form>
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
    };
  },
  async created() {
    try {
      const discussionId = this.$route.params.id;

      const discussionDoc = await db
        .collection("discussions")
        .doc(discussionId)
        .get();
      this.discussion = { id: discussionDoc.id, ...discussionDoc.data() };

      const repliesSnapshot = await db
        .collection("replies")
        .where("discussionId", "==", discussionId)
        .orderBy("createdAt", "asc")
        .get();

      let temp = [];

      for (const doc of repliesSnapshot.docs) {
        const reply = { id: doc.id, ...doc.data() };
        const userSnapshot = await db
          .collection("users")
          .doc(reply.author)
          .get();
        if (userSnapshot.exists) {
          reply.username = userSnapshot.data().name;
        } else {
          reply.username = "Unknown";
        }
        temp.push(reply);
      }
      this.replies = temp;
    } catch (error) {
      console.error("Error fetching discussion or replies:", error);
    }
  },
  methods: {
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

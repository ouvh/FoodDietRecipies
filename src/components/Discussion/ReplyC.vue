<template>
  <b-container>
    <b-form @submit.prevent="postReply">
      <b-form-group label="Reply">
        <b-form-textarea v-model="replyContent" required></b-form-textarea>
      </b-form-group>
      <b-button type="submit" variant="primary">Post Reply</b-button>
    </b-form>
  </b-container>
</template>

<script>
import { db, auth } from '../../firebase';

export default {
  props: ['discussionId'],
  data() {
    return {
      replyContent: ''
    };
  },
  methods: {
    async postReply() {
      const user = auth.currentUser;
      await db.collection('replies').add({
        discussionId: this.discussionId,
        content: this.replyContent,
        author: user.uid,
        createdAt: new Date()
      });
      this.replyContent = '';
    }
  }
};
</script>

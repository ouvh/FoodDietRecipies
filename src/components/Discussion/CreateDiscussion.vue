<template>
  <Navbar />
  <b-container style="margin-top:50px" class="create-discussion-container">
    <b-row class="justify-content-center">
      <b-col>
        <b-card
          bg-variant="light"
          text-variant="dark"
          class="create-discussion-card"
        >
          <b-form @submit.prevent="createDiscussion">
            <b-form-group label="Title">
              <b-form-input v-model="title" required></b-form-input>
            </b-form-group>


            <b-form-group label="Content">
              <b-form-textarea v-model="content" required></b-form-textarea>
            </b-form-group>

             <b-form-group label="Preparation Time">
              <b-form-input v-model="prep_time" required></b-form-input>
            </b-form-group>

            <b-form-group label="Image Link">
              <b-form-input v-model="image_link" required></b-form-input>
            </b-form-group>

             <b-form-group label="Ingredients">
               <div class="input-group mb-3">
                    <b-form-tags
                      input-id="tags-remove-on-delete"
                      :input-attrs="{ 'aria-describedby': 'tags-remove-on-delete-help' }"
                      v-model="ingredients"
                      :tag-validator="onTagStatei"
                      separator="/"
                      placeholder="Enter new ingredients separated by / "
                      remove-on-delete
                      no-add-on-enter
                      class="flex-grow-1"
                    ></b-form-tags>
                           </div>
             </b-form-group>

             
             <b-form-group label="Instructions">
               <div class="input-group mb-3">
                    <b-form-tags
                      input-id="tags-remove-on-delete"
                      :input-attrs="{ 'aria-describedby': 'tags-remove-on-delete-help' }"
                      v-model="instructions"
                      :tag-validator="onTagStatei"
                      separator="/"
                      placeholder="Enter new Instructions separated by / "
                      remove-on-delete
                      no-add-on-enter
                      class="flex-grow-1"
                    ></b-form-tags>
                           </div>
             </b-form-group>


            

            

    <b-form-group label="Choose your diet">
      <div class="input-group mb-3">
        <b-form-tags
          label="Choose  diet of this Recipe"
          input-id="tags-remove-on-delete"
          :input-attrs="{ 'aria-describedby': 'tags-remove-on-delete-help' }"
          v-model="diet"
          :tag-validator="onTagState"
          separator=" "
          placeholder="Enter new diets separated by space"
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






            <b-button type="submit" style="background-color:orange" class="btn-block"
              >Add Recipe</b-button
            >
          </b-form>




        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import Navbar from "@/components/Layout/NavBar.vue";
import { db, auth } from "../../firebase";
import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';



export default {
  components: { Navbar },
  data() {
    return {
      title: "",
      content: "",
      tags: [],
      diet:[],
      image_link:'',
      ingredients:[],
      instructions:[],
      prep_time:"10 min",
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
    onTagStatei(tag) {
      if (this.tags.includes(tag)) {
        return false;
      }
      return true;
    },
    async createDiscussion() {
      if (this.diet.length === 0) {
        alert("please choos at least a diet");
        return;
      }

      if (this.ingredients.length === 0) {
        alert("");
        Toastify({
        text: "choose at least one ingredient",
        duration: 3000,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        backgroundColor: "red",
      }).showToast();
        
        
        return;
      }



      
      if (this.instructions.length === 0) {
        alert("");
        Toastify({
        text: "choose at least one instruction",
        duration: 3000,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        backgroundColor: "red",
      }).showToast();
        
        
        return;
      }













      const user = auth.currentUser;
      try {
        await db.collection("discussions").add({
          title: this.title,
          content: this.content,
          author: user.uid,
          createdAt: new Date(),
          tags: this.diet,
          image_link:this.image_link,
          ingredients:this.ingredients,
          instructions:this.instructions,
          prep_time:this.prep_time,
        });
        this.$router.push("/");
      } catch (error) {
        alert(error.message);
      }
    },
  },
};
</script>

<style scoped>
.create-discussion-container {
  background-color: #f8f9fa;
  align-items: center;
}
.create-discussion-card {
  padding: 20px;
  border-width: 2px;
}
.btn-block {
  width: 100%;
}
.sidebar {
  background-color: #f4f4f4;
  padding: 20px;
  width: 100%;
  overflow-x: auto;
  white-space: nowrap;
  -webkit-overflow-scrolling: touch;
}
.sidebar h2 {
  margin-top: 0;
  margin-bottom: 10px;
}
.tag-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: inline-block;
}
.tag-list li {
  display: inline-block;
  margin-right: 10px;
}
.tag-list li a {
  text-decoration: none;
  color: #333;
  font-weight: bold;
  padding: 5px 10px;
  border-radius: 20px;
  background-color: #ddd;
  transition: background-color 0.3s;
  cursor: pointer;
}
.tag-list li a:hover {
  background-color: #007bff;
  color: #fff;
}
</style>

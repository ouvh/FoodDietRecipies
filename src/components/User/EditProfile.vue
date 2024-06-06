<template>
  <Navbar/>

  <b-container class="signup-container">
    <b-row class="justify-content-center">
      <b-col md="6" lg="4">
        <b-card bg-variant="light"   style="background-color:orange;border-color:orange"  class="signup-card">
          <b-form @submit.prevent="signUp">
            <b-form-group label="Username">
              <b-form-input v-model="name" type="text" required></b-form-input>
            </b-form-group>
            




    <b-form-group label="Choose your diet">
      <div class="input-group mb-3">
        <b-form-tags
          label="Choose your diet"
          input-id="tags-remove-on-delete"
          :input-attrs="{ 'aria-describedby': 'tags-remove-on-delete-help' }"
          v-model="diet"
          :tag-validator="onTagState"
          separator=" "
          placeholder="Enter new tags separated by space"
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


















            <b-form-group label="Email">
              <b-form-input
                v-model="email"
                type="email"
                disabled
              ></b-form-input>
            </b-form-group>
            
            
            <b-button type="submit"  style="background-color:orange;border-color:orange"   class="btn-block"
              >Edit</b-button
            >
            <b-button @click="goToLogin" variant="link" class="btn-block"
              >Login</b-button
            >
            <b-button @click=" this.$router.push('/reset-password');" variant="link" class="btn-block"
              >Change Password</b-button
            >
          </b-form>
        </b-card>
      </b-col>
    </b-row>
  </b-container>


</template>

<script>
import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';
import Navbar from '@/components/Layout/NavBar.vue';



import { db,auth } from '../../firebase';

export default {
  components:{Navbar},
  data() {
    return {
      loading:true,
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
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
  async created(){
     try {
    let o = await db.collection("users").doc(auth.currentUser.uid).get();
    o= o.data()// Logging the actual data fetched from the database
    this.name = o.name
    this.email = auth.currentUser.email
    this.diet = o.diets
    this.loading = false


    

} catch (error) {
    console.error("Error fetching user data:", error);
}


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
  async signUp() {
      

      if(this.diet.length == 0){
        Toastify({
        text: "choose a least a diet",
        duration: 3000,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        backgroundColor: "red",
      }).showToast();
      return;

      }



        try {
        



          try {
          await db.collection('users').doc(auth.currentUser.uid).set({
            userid: auth.currentUser.uid,
            name:this.name,
            diets:this.diet,
            email:this.email
          },{ merge: true });
          this.$router.push('/');
        } catch (error) {
          Toastify({
        text:error.message,
        duration: 3000,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        backgroundColor: "red",
      }).showToast();
          
        }


          this.$router.push('/');
        } catch (error) {
          alert(error.message);
        }
    },

    goToLogin() {
      this.$router.push('/login');
    }
  }
};
</script>

<style scoped>
.signup-container {
  margin-top: 100px;
}
.signup-card {
  padding: 20px;
  border-width: 2px;
}
.btn-block {
  width: 100%;
}
</style>

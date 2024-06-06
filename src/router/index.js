import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/HomePage.vue';
import Login from '../views/LoginPage.vue';
import SignUp from '../views/SignUp.vue';
import Profile from '../views/ProfilePage.vue';
import Category from '../views/CategoryPage.vue';
import Discussion from '../views/DiscussionPage.vue';
import EditProfile from '../components/User/EditProfile.vue';
import CreateDiscussion from '../components/Discussion/CreateDiscussion.vue';
import ResetPassword from '../components/Auth/ResetPassword.vue'
import {auth} from "@/firebase"

const routes = [
  { path: '/', name: 'Home', component: Home,meta: { requiresAuth: true } },
  { path: '/login', name: 'Login', component: Login },
  { path: '/signup', name: 'SignUp', component: SignUp },
  { path: '/profile', name: 'Profile', component: Profile ,meta: { requiresAuth: true }},
  { path: '/edit-profile', name: 'EditProfile', component: EditProfile ,meta: { requiresAuth: true }},
  { path: '/recepies/:tag', name: 'recepies', component: Category ,props:true,meta: { requiresAuth: true }},
  { path: '/AllCategories', name: 'Allcategories', component: Category ,props:true,meta: { requiresAuth: true }},
  { path: '/discussion/:id', name: 'Discussion', component: Discussion ,meta: { requiresAuth: true }},
  { path: '/create-discussion', name: 'CreateDiscussion', component: CreateDiscussion ,meta: { requiresAuth: true }},
  { path: '/reset-password', name: 'ResetPassword', component: ResetPassword },

];



const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
   const currentUser = auth.currentUser;
  console.log(currentUser)

  if (requiresAuth && !currentUser) {
    next('/login');
  } else {
    next();
  }

 
});

export default router;

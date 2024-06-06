const firebase = require('firebase/app');
require('firebase/firestore');

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyC0-OiihXw1zZKe2SaztZMXUquQiI",
    authDomain: "od.firebaseapp.com",
    projectId: "oo",
    storageBucket: "i.appspot.com",
    messagingSenderId: "o",
    appId: "1:o:web:05poinad7ad0d4c"
  };
firebase.initializeApp(firebaseConfig);

// Access Firestore
const db = firebase.firestore();


const jobsData = [
    {
      "author": "jrbWmMyS9xNlTP4PVQWTgnsG4rJ3",
      "content": "A delicious and healthy pasta recipe with fresh ingredients.",
      "createdAt": "6 June 2024 à 22:02:31 UTC+1",
      "image_link": "https://www.simplyrecipes.com/thmb/0mKlW1DoFkhnHeLqzYwzkXWuo3U=/960x0/filters:no_upscale():max_bytes(150000):strip_icc()/Simply-Recipes-Spaghetti-Carbonara-LEAD-2-2e6df68bf6b24ebcb6e5d0651a0d1acb.jpg",
      "ingredients": ["500g spaghetti", "200g pancetta", "100g parmesan", "3 eggs", "salt", "pepper"],
      "instructions": ["Cook spaghetti until al dente.", "Fry pancetta until crispy.", "Mix eggs and parmesan.", "Combine spaghetti, pancetta, and egg mixture.", "Season with salt and pepper."],
      "prep_time": "30 minutes",
      "tags": ["omnivore", "gluten-free"],
      "title": "Spaghetti Carbonara"
    },
    {
      "author": "xNbYjWdK5zNlTP4YVWQfgkRG6rH2",
      "content": "A classic margherita pizza with fresh basil.",
      "createdAt": "5 June 2024 à 18:10:45 UTC+1",
      "image_link": "https://www.simplyrecipes.com/thmb/5vKzsb6fF2EBRe71D3Si6Dsx9S4=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Simply-Recipes-Margherita-Pizza-LEAD-05-bebcf0a57212430cb35b458d5b592d12.jpg",
      "ingredients": ["500g flour", "300ml water", "10g yeast", "salt", "200g tomato sauce", "150g mozzarella", "fresh basil"],
      "instructions": ["Mix flour, yeast, and salt.", "Add water and knead into dough.", "Let it rise for 1 hour.", "Spread sauce and add toppings.", "Bake at 220°C for 15 minutes."],
      "prep_time": "1 hour 30 minutes",
      "tags": ["vegetarian", "gluten-free"],
      "title": "Margherita Pizza"
    },
    {
      "author": "kLzNnNzL9xNlTP4PVQXUgfgS8rJ5",
      "content": "A spicy and flavorful chicken curry with coconut milk.",
      "createdAt": "4 June 2024 à 20:05:22 UTC+1",
      "image_link": "https://www.simplyrecipes.com/thmb/o0gnI8USLtoVCNU5kSRe_Qxbr1Y=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Simply-Recipes-Chicken-Curry-LEAD-2-5257a66b07214bbfbc77e20cf3c1795e.jpg",
      "ingredients": ["500g chicken breast", "200ml coconut milk", "100g curry paste", "1 onion", "2 garlic cloves", "ginger", "salt", "pepper"],
      "instructions": ["Fry onion, garlic, and ginger.", "Add chicken and cook until browned.", "Add curry paste and coconut milk.", "Simmer for 20 minutes.", "Season with salt and pepper."],
      "prep_time": "40 minutes",
      "tags": ["paleo", "keto"],
      "title": "Chicken Curry"
    },
    {
      "author": "mRcOaQsP6zNlTP4YVWUfgkRG9rJ7",
      "content": "A vegetarian pizza loaded with fresh vegetables.",
      "createdAt": "3 June 2024 à 15:20:31 UTC+1",
      "image_link": "https://assets.bonappetit.com/photos/57acfaa41b334044149752e2/1:1/w_2560%2Cc_limit/ultimate-veggie-pizza.jpg",
      "ingredients": ["500g flour", "300ml water", "10g yeast", "salt", "200g tomato sauce", "150g mozzarella", "bell peppers", "onions", "mushrooms"],
      "instructions": ["Mix flour, yeast, and salt.", "Add water and knead into dough.", "Let it rise for 1 hour.", "Spread sauce and add toppings.", "Bake at 220°C for 15 minutes."],
      "prep_time": "1 hour 30 minutes",
      "tags": ["vegetarian", "flexitarian"],
      "title": "Vegetarian Pizza"
    },
    {
      "author": "pWdQjKdK4zNlTP4ZWQXfgkRG5rJ2",
      "content": "A refreshing and healthy quinoa salad.",
      "createdAt": "2 June 2024 à 14:45:10 UTC+1",
      "image_link": "https://www.simplyrecipes.com/thmb/kXulCFQMO54sDEDeGZbciZpApm0=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Simply-Recipes-Quinoa-Salad-LEAD-2-73766f8961884e2591c52c9e94dffb89.jpg",
      "ingredients": ["200g quinoa", "100g cherry tomatoes", "1 cucumber", "1 red onion", "50g feta cheese", "lemon juice", "olive oil", "salt", "pepper"],
      "instructions": ["Cook quinoa and let it cool.", "Chop vegetables and feta.", "Mix quinoa, vegetables, and feta.", "Add lemon juice, olive oil, salt, and pepper."],
      "prep_time": "20 minutes",
      "tags": ["vegan", "gluten-free"],
      "title": "Quinoa Salad"
    },
    {
      "author": "sQnYlLdK8zNlTP4ZVWQfgkRG7rJ4",
      "content": "A hearty beef stew with root vegetables.",
      "createdAt": "1 June 2024 à 12:30:50 UTC+1",
      "image_link": "https://www.simplyrecipes.com/thmb/vqUpnCITaXyATdrQECZil9h4Njc=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Simply-Recipes-Beef-Stew-LEAD-2-d478d3f3ad9145dc85b9aa4cf16abfc2.jpg",
      "ingredients": ["500g beef", "3 carrots", "2 potatoes", "1 onion", "2 garlic cloves", "500ml beef broth", "salt", "pepper"],
      "instructions": ["Brown the beef.", "Add chopped vegetables and garlic.", "Pour in beef broth.", "Simmer for 1 hour.", "Season with salt and pepper."],
      "prep_time": "1 hour 30 minutes",
      "tags": ["omnivore", "paleo"],
      "title": "Beef Stew"
    },
    {
      "author": "tJrWmKyS7zNlTP4XVQWTgnsG8rJ3",
      "content": "A delicious BBQ chicken pizza with a tangy sauce.",
      "createdAt": "31 May 2024 à 10:05:45 UTC+1",
      "image_link": "https://www.dinneratthezoo.com/wp-content/uploads/2020/01/bbq-chicken-pizza-5.jpg",
      "ingredients": ["500g flour", "300ml water", "10g yeast", "salt", "200g BBQ sauce", "150g mozzarella", "100g chicken breast", "red onions"],
      "instructions": ["Mix flour, yeast, and salt.", "Add water and knead into dough.", "Let it rise for 1 hour.", "Spread BBQ sauce and add toppings.", "Bake at 220°C for 15 minutes."],
      "prep_time": "1 hour 30 minutes",
      "tags": ["omnivore", "flexitarian"],
      "title": "BBQ Chicken Pizza"
    }]

// Function to add data to Firestore
const addJobsToFirestore = async (jobsData) => {
  try {
    // Loop through each job and add it to Firestore
    for (const job of jobsData) {
      // Use set with merge to add or update the document
      await db.collection('discussions').add(job);
    }
    console.log("Jobs added to Firestore successfully!");
  } catch (error) {
    console.error("Error adding jobs to Firestore: ", error);
  }
};

// Call the function to add jobs data to Firestore
addJobsToFirestore(jobsData);










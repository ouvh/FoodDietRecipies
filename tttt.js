const firebase = require('firebase/app');
require('firebase/firestore');

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyC0-OV7UPUqMhXw1zZKe2SaztZMXUquQiI",
    authDomain: "foodrecipiescc.firebaseapp.com",
    projectId: "foodrecipiescc",
    storageBucket: "foodrecipiescc.appspot.com",
    messagingSenderId: "985562218661",
    appId: "1:985562218661:web:051c5e10709a6ad7ad0d4c"
  };
firebase.initializeApp(firebaseConfig);

// Access Firestore
const db = firebase.firestore();


const jobsData = [{
    "author": "8D0UBWD2FrN33ahnC9RVCTDC1e92",
    "title": "Quinoa Stuffed Bell Peppers",
    "description": "Colorful bell peppers stuffed with a hearty quinoa and vegetable filling, baked to perfection.",
    "diets": ["vegetarian", "gluten-free"],
    "image": "https://example.com/images/quinoa_stuffed_bell_peppers.jpg",
    "ingredients": [
      "4 bell peppers, halved and seeds removed",
      "1 cup quinoa, cooked",
      "1 can black beans, drained and rinsed",
      "1 cup corn kernels",
      "1 cup diced tomatoes",
      "1/2 cup diced onion",
      "2 cloves garlic, minced",
      "1 tsp cumin",
      "1 tsp chili powder",
      "Salt",
      "Pepper",
      "1/2 cup shredded cheese (optional)"
    ],
    "instructions": [
      "Preheat oven to 375°F (190°C).",
      "In a large skillet, sauté onion and garlic until softened.",
      "Add cooked quinoa, black beans, corn, diced tomatoes, cumin, chili powder, salt, and pepper. Cook until heated through.",
      "Fill each bell pepper half with the quinoa mixture.",
      "Top with shredded cheese if desired.",
      "Bake in preheated oven for 20-25 minutes, or until peppers are tender.",
      "Serve hot."
    ],
    "prep_time": "15 minutes",
    "cook_time": "25 minutes",
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

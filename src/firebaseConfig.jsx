import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyARYBuv2EWJmEmXh6MMYYxWJHnE21DfonU",
  authDomain: "movies-app-154a5.firebaseapp.com",
  projectId: "movies-app-154a5",
  storageBucket: "movies-app-154a5.appspot.com",
  messagingSenderId: "1054134740371",
  appId: "1:1054134740371:web:18809de5fadc0f994cb466"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Get a reference to the database service
const database = getDatabase(app);

export default database;
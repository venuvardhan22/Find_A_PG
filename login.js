import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyAuleT2VwEKv0yu1XHeQbAjApoo5S3IaQA",
    authDomain: "find-a-pg.firebaseapp.com",
    databaseURL: "https://find-a-pg-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "find-a-pg",
    storageBucket: "find-a-pg.appspot.com",
    messagingSenderId: "346261878903",
    appId: "1:346261878903:web:80dba29c8b659f51072e72"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get the Auth instance
const auth = getAuth();
// Get the Database instance
const db = getDatabase();



const login = () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    signInWithEmailAndPassword(auth, email, password)
        .then((res) => {
            console.log(res.user);
            window.location.href = 'change.html';
        })
        .catch((err) => {
            alert(err.message,'Account not found');
            console.error(err.code);
            console.error(err.message);
            window.location.href = 'signin.html'
        });
};

document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.login-btn').addEventListener('click', login);
});


// JavaScript
function signin() {
    // Add your sign-in logic here
    window.location.href = 'signin.html'; // Redirect to signin.html
}

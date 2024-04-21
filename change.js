// change.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
import { getDatabase, ref, get, set } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-database.js";

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

// Check if user is logged in
onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is logged in, retrieve user's data from the database
        const userId = user.uid;
        const userRef = ref(db, 'users/' + userId);

        // Get DOM elements
        const newEmailInput = document.getElementById('new-email');
        const newUsernameInput = document.getElementById('new-username');
        const newHostelnameInput = document.getElementById('new-hname');
        const newPhoneInput = document.getElementById('new-phone');
        const newPriceInput = document.getElementById('new-price');
        const newDoorInput = document.getElementById('new-door');
        const newStreetInput = document.getElementById('new-street');
        const newAreaInput = document.getElementById('new-area');
        const newCityInput = document.getElementById('new-city');
        const newPinInput = document.getElementById('new-pin');
        const newVacanciesInput = document.getElementById('new-vacancies');
        const changeBtn = document.querySelector('.change-btn');
        const logoutBtn = document.querySelector('.logout-btn');

        // Event listener for the "Change Data" button
        changeBtn.addEventListener('click', () => {
            const newEmail = newEmailInput.value;
            const newUsername = newUsernameInput.value;
            const newHostelname = newHostelnameInput.value;
            const newPhone = newPhoneInput.value;
            const newPrice = newPriceInput.value;
            const newDoor = newDoorInput.value;
            const newStreet = newStreetInput.value;
            const newArea = newAreaInput.value;
            const newCity = newCityInput.value;
            const newPin = newPinInput.value;
            const newVacancies = newVacanciesInput.value;

            // Update user's data in the database
            set(userRef, {
                email: newEmail,
                username: newUsername,
                hostelname: newHostelname,
                phone: newPhone,
                price: newPrice,
                door: newDoor,
                street: newStreet,
                area: newArea,
                city: newCity,
                pin: newPin,
                vacancies: newVacancies

                // Add other user data if needed
            })
            .then(() => {
                alert('Data changed successfully!');
            })
            .catch((error) => {
                alert('Failed to change data: ' + error.message);
            });
        });

        // Event listener for the "Logout" button
        logoutBtn.addEventListener('click', () => {
            signOut(auth)
            .then(() => {
                // User logged out successfully, redirect to login page
                window.location.href = 'home.html';
            })
            .catch((error) => {
                console.error('Logout error:', error);
            });
        });

        // Retrieve user's current data from the database and fill the input fields
        get(userRef)
            .then((snapshot) => {
                const userData = snapshot.val();
                if (userData) {
                    newEmailInput.value = userData.email;
                    newUsernameInput.value = userData.username;
                    newHostelnameInput.value = userData.hostelname;
                    newPhoneInput.value = userData.phone;
                    newPriceInput.value = userData.price;
                    newDoorInput.value = userData.door;
                    newStreetInput.value = userData.street;
                    newAreaInput.value = userData.area;
                    newCityInput.value = userData.city;
                    newPinInput.value = userData.pin;
                    newVacanciesInput.value = userData.vacancies;
                }
            })
            .catch((error) => {
                console.error('Error getting user data:', error);
            });
    } else {
        // User is not logged in, redirect to login page
        window.location.href = 'login.html';
    }
});

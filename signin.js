import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-database.js";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-storage.js";

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
const db = getDatabase(app);

// Get the Storage instance
const storage = getStorage(app);

// Function to register user and upload image
const register = () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const uname = document.getElementById('uname').value;
    const hname = document.getElementById('hname').value;
    const phone = document.getElementById('phone').value;
    const price = document.getElementById('price').value;
    const door = document.getElementById('door').value;
    const street = document.getElementById('street').value;
    const area = document.getElementById('area').value;
    const city = document.getElementById('city').value;
    const pin = document.getElementById('pin').value;
    const lat = document.getElementById('lat').value;
    const lon = document.getElementById('lon').value;
    const vacancies = document.getElementById('vacancies').value;
    const image = document.getElementById('fileInput').files[0]; // Get uploaded image

    // Create user with email and password
    createUserWithEmailAndPassword(auth, email, password)
        .then((res) => {
            console.log(res.user);
            // Store user data along with image URL in the same branch
            const userDataRef = ref(db, 'users/' + res.user.uid);
            const storageRefVar = storageRef(storage, 'images/' + image.name); // Reference to image storage path

            // Upload image to storage
            uploadBytes(storageRefVar, image)
                .then((snapshot) => {
                    // Get download URL for the uploaded image
                    getDownloadURL(snapshot.ref)
                        .then((downloadURL) => {
                            // Store user data and image URL in the database
                            set(userDataRef, {
                                email: email,
                                username: uname,
                                hostelname: hname,
                                phone: phone,
                                password : password,
                                vacancies : vacancies,
                                price: price,
                                door: door,
                                street: street,
                                area: area,
                                city: city,
                                pin: pin,
                                lat: lat,
                                lon:lon,
                                imageUrl: downloadURL // Store image URL
                            })
                            .then(() => {
                                console.log('User data and image uploaded successfully');
                                // After successful upload, navigate to login.html
                                window.location.href = 'login.html';
                            })
                            .catch((error) => {
                                console.error('Error uploading user data:', error);
                            });
                        })
                        .catch((error) => {
                            console.error('Error getting download URL:', error);
                        });
                })
                .catch((error) => {
                    console.error('Error uploading image:', error);
                });
        })
        .catch((err) => {
            alert(err.message);
            console.error(err.code);
            console.error(err.message);
        });
};

// Event listener for register button click
document.querySelector('.submit-btn').addEventListener('click', register);

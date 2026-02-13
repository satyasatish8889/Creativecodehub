 // Import the functions you need from the SDKs you need
import { initializeApp } from "http://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDOv37UFcvA84K0bPcHkhY140SmFON0rDo",
  authDomain: "creative-code-lms.firebaseapp.com",
  projectId: "creative-code-lms",
  storageBucket: "creative-code-lms.firebasestorage.app",
  messagingSenderId: "212253775449",
  appId: "1:212253775449:web:4d5188121d22d1b3184348"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

import { getAuth, createUserWithEmailAndPassword } from "http://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";

const auth = getAuth();
 const submit=document.getElementById("submit");
 submit.addEventListener("click",function(event){
    event.preventDefault()
     const firstname=document.getElementById("firstname").value;
 const username=document.getElementById("username").value;
 const email=document.getElementById("email").value;
 const password=document.getElementById("password").value;
 const confirmpassword=document.getElementById("confirmpassword").value;
createUserWithEmailAndPassword(auth,firstname,username, email, password,confirmpassword)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    alert("account created sucessfully")
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorMessage);
    // ..
  });
 });

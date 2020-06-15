import firebase from 'firebase/app';
import "firebase/auth";


//Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDvcWuLE2-FSF3MYCCGV8cZ0jsDDyxaliU",
  authDomain: "adept-script-279305.firebaseapp.com",
  databaseURL: "https://adept-script-279305.firebaseio.com",
  projectId: "adept-script-279305",
  storageBucket: "adept-script-279305.appspot.com",
  messagingSenderId: "598711515375",
  appId: "1:598711515375:web:7437f999b6a9720352c31a"
};

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  //Export instance of firebase auth
  export const auth = firebase.auth();
 
  

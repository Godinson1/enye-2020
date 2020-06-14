import firebase from 'firebase/app';
import "firebase/auth";


//Firebase configuration
var firebaseConfig = {
    apiKey: "xxxxx",
    authDomain: "xxxxx",
    databaseURL: "xxxxx",
    projectId: "xxxxx",
    storageBucket: "xxxxx",
    messagingSenderId: "xxxxx",
    appId: "xxxxx"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  //Export instance of firebase auth
  export const auth = firebase.auth();
 
  

import { initializeApp } from "firebase/app";
import  {getAuth} from "firebase/auth";
const firebaseConfig = {
    apiKey: "AIzaSyCjNRVDwznLn1UFw1V1usuFyMK344a2f1g",
    authDomain: "webpage-clone.firebaseapp.com",
    projectId: "webpage-clone",
    storageBucket: "webpage-clone.appspot.com",
    messagingSenderId: "92401249104",
    appId: "1:92401249104:web:f9f04b2dda455d20d21a55",
    measurementId: "G-7534RTGTVP"
  };
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); 
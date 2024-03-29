
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
   // TODO: Add SDKs for Firebase products that you want to use
   // https://firebase.google.com/docs/web/setup#available-libraries
import { getStorage } from  'firebase/storage' ;
   // Your web app's Firebase configuration

const firebaseConfig = {
    apiKey: "AIzaSyBFJ3mSSOO2Nc6llBgu5Jap2dWnHHb4Wh4",
    authDomain: "noddingsouls.firebaseapp.com",
    projectId: "noddingsouls",
    storageBucket: "noddingsouls.appspot.com",
    messagingSenderId: "51737925744",
    appId: "1:51737925744:web:3b91b72e47b562537cfcb5"
};

   // FIREBASE APP INIT_______________________________________________________________.
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage();



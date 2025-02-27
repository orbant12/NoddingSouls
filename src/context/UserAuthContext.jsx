import { useContext, createContext, useEffect, useState } from "react"

import { AuthErrorCodes, createUserWithEmailAndPassword, onAuthStateChanged,signInWithEmailAndPassword,sendEmailVerification  } from "firebase/auth";
import { auth, db,app } from "../firebase";
import { collection, doc, setDoc,getDoc} from "firebase/firestore";


const userContext = createContext();

//REFERENC TO ACCESS CODE.-----------------------------------------
export const useAuth = () => { return useContext(userContext) }


const UserAuthContext = ({ children }) => {
//CURRENT USER DATA .________________________________________
const [currentuser, setuser] = useState()
const [error, setError] = useState("")
const [userData, setUserData] = useState([]);


//CHECKING FOR AUTHENTICATED USER AND GET DATA.-------------------------------
useEffect(() => {
      onAuthStateChanged(auth, user => {
        console.log(user)
        if (user) {
          setuser(user)
          console.log("u are logged in")
          if(window.location.pathname == "/login" && window.location.pathname == "/register"){
            window.location.href = "/"
          }    
        }
        else {
          
          /*if(window.location.pathname != "/login" && window.location.pathname != "/register" && window.location.pathname != "/support/contact-us" && window.location.pathname != "/support/feedback" && window.location.pathname != "/policies/legal" && window.location.pathname != "/policies/legal/terms" && window.location.pathname != "/policies/legal/cookie-policy" && window.location.pathname != "/policies/legal/privacy-policy" && window.location.pathname != "/policies/legal/acceptable-use-policy" && window.location.pathname != "/policies/security" && window.location.pathname != "/landing" && window.location.pathname != "/policies"){
              window.location.href = "/landing"
            }*/
               
        }
      })
const fetchData = async () => {
        try {
          if (currentuser) {
            const currentUserId = currentuser.uid;
            const userDocRef = doc(db, "users", currentUserId);
            
    
            const docSnapshot = await getDoc(userDocRef);
    
            if (docSnapshot.exists()) {
              // Document exists, retrieve its data
              const elementData = docSnapshot.data();
              setUserData(elementData);
            } else {
              console.log("Document does not exist.");
              setUserData(null); // Set to null or handle accordingly
            }
          }
        } catch (error) {
          console.error("Error getting document: ", error);
        }
      };

  fetchData()
}, [currentuser]);

//LOGIN._----------------------------------------------------------------
const Login = async (email,password) => {
  const logEmail = email;
  const logPass = password
  try{
    await signInWithEmailAndPassword(auth,logEmail,logPass)
    .then((userCredential) => {
      // Signed in 
        const user = userCredential.user;
        console.log(user)
        window.location.href = "/"
    })
  }catch(error){
    console.log(error)
    alert("Wrong Email or Password")
  }
 
}

//REGISTRATION.-----------------------------------------------------------
const SignUp = async (email, password, FullName,userName) => {
  console.log("1");
  const fullName_pass = FullName;
  const regEmail = email;
  const userPassword = password;
  const user_name_pass = userName;
  
  try {
    const result = await createUserWithEmailAndPassword(auth, regEmail, userPassword);
    //RESULT == USER DATA
    const signeduser = result.user;
    //Setting Fresh Registrated user To the Document
    const userId = signeduser.uid;
    const colRef = collection(db, "users");
    const tagRef = collection(db, "users", userId, "Tags");
    //const newTagRef = doc(tagRef);
    console.log(userId);
    //SETTING USER DOCUMENT TO FIRESTORE
    try {
          
            await setDoc(doc(colRef, userId),{
              id: userId,
              fullname: fullName_pass,
              email: regEmail,
              subscription: false,
              storage_take:0,
              profilePictureURL: "",
              recent:"",
              user_since: new Date().toLocaleDateString(),
              followers: 0,
              description:"",
              user_name: "@" + user_name_pass,
            });

             await setDoc(doc(tagRef,userId),{
              tags:[
                "None"
              ]
             });

            console.log("Document successfully added!");
            
    } catch (error) {
            console.error("Error adding document: ", error);
    };

    alert("Wellcome new User create successfully");
    await sendEmailVerification(signeduser)
    window.location.href = "/"
          
  } catch(err) {
    //ERROR IF ITS IN ALREADY USE
    if (err.code === "auth/email-already-in-use") {
      alert("Email already in use, try another email");
      setTimeout(() => {
        setError("");
      }, 5000);
    } else if (err.code === AuthErrorCodes.WEAK_PASSWORD) {
      alert("Password must be at least 6 characters");
      setTimeout(() => {
        setError("");
      }, 5000);
    } else {
      setError(err.message);
    }
  }
}
    
//END VALUES ACCES To ALL JSX

const value = {
    SignUp,
    error,
    currentuser,
    Login,
}


return (
    <userContext.Provider value={value}>{children}</userContext.Provider>
)
}

export default UserAuthContext
import { useEffect, useState } from "react";

import {
  onAuthStateChanged,
  signOut
} from "firebase/auth";

import { auth } from "./firebase";


import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./pages/Home";

import "./App.css";



function App(){


const [user,setUser] = useState(null);

const [showSignup,setShowSignup] = useState(false);

const [loading,setLoading] = useState(true);






useEffect(()=>{


const unsubscribe = onAuthStateChanged(

auth,

(currentUser)=>{


setUser(currentUser);

setLoading(false);


}

);



return ()=>unsubscribe();



},[]);









const logout = async()=>{


await signOut(auth);

setUser(null);

setShowSignup(false);


};









if(loading){

return <h2>Loading...</h2>;

}









if(!user){


return showSignup ?



<Signup

setShowSignup={setShowSignup}

/>



:



<Login

switchSignup={()=>setShowSignup(true)}

setUser={setUser}

/>


;

}









return (

<Home

user={user}

logout={logout}

/>

);



}



export default App;
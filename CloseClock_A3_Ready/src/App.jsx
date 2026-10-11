import { useEffect, useState } from "react";

import { onAuthStateChanged, signOut } from "firebase/auth";

import { auth } from "./firebase";


import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./pages/Home";

import "./App.css";



function App(){


const [user,setUser]=useState(null);

const [showSignup,setShowSignup]=useState(false);




useEffect(()=>{


const unsubscribe = onAuthStateChanged(
auth,
(currentUser)=>{

setUser(currentUser);

}

);


return ()=>unsubscribe();


},[]);





const logout = async()=>{

await signOut(auth);

setUser(null);

};





if(!user){


return showSignup

?

<Signup setShowSignup={setShowSignup}/>

:

<Login setShowSignup={setShowSignup}/>


}



return (

<Home

user={user}

logout={logout}

/>

);


}


export default App;
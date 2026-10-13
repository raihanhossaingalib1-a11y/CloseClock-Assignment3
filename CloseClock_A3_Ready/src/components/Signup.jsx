import { useState } from "react";

import { auth } from "../firebase";

import {
createUserWithEmailAndPassword
} from "firebase/auth";



function Signup({

setShowSignup

}) {



const [email,setEmail]=useState("");

const [password,setPassword]=useState("");







const signup=async()=>{


try{


await createUserWithEmailAndPassword(

auth,

email,

password

);





alert(
"Account created successfully."
);



// go login page

setShowSignup(false);



setEmail("");

setPassword("");



}


catch(error){


alert(error.message);


}



};









return (

<div className="login-page">

<div className="login-card">


<div className="login-logo">

⏰

</div>


<h1>

Create Account

</h1>


<p className="login-subtitle">

Join CloseClock and manage your productivity.

</p>





<input

type="email"

placeholder="Email Address"

value={email}

onChange={(e)=>setEmail(e.target.value)}

/>





<input

type="password"

placeholder="Password"

value={password}

onChange={(e)=>setPassword(e.target.value)}

/>





<button

className="login-button"

onClick={signup}

>

Sign Up

</button>





<p className="signup-text">

Already have an account?


<span

onClick={()=>setShowSignup(false)}

>

Login

</span>


</p>



</div>

</div>


);



}



export default Signup;
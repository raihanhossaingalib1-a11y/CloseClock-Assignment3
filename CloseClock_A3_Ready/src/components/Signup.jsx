import { useState } from "react";

import { auth } from "../firebase";

import {
createUserWithEmailAndPassword,
signOut
} from "firebase/auth";



function Signup({
setShowSignup,
setSkipAuth
}){


const [email,setEmail]=useState("");

const [password,setPassword]=useState("");





const signup=async()=>{


try{


await createUserWithEmailAndPassword(
auth,
email,
password
);



// logout immediately

await signOut(auth);



// stop Firebase auto redirect

setSkipAuth(true);



// move login page

setShowSignup(false);



setEmail("");

setPassword("");



alert(
"Account created successfully. Please login."
);



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
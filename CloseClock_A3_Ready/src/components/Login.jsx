import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";


function Login({setShowSignup}){


const [email,setEmail]=useState("");
const [password,setPassword]=useState("");



const login = async(e)=>{

e.preventDefault();


try{

await signInWithEmailAndPassword(
auth,
email,
password
);


}

catch(error){

alert(error.message);

}


};





return(

<div className="login-container">


<h2>
Login
</h2>



<form onSubmit={login}>


<input

type="email"

placeholder="Email"

value={email}

onChange={(e)=>setEmail(e.target.value)}

/>




<input

type="password"

placeholder="Password"

value={password}

onChange={(e)=>setPassword(e.target.value)}

/>




<button type="submit">

Login

</button>



</form>



<p>

Don't have an account?

<button 
onClick={()=>setShowSignup(true)}
>

Signup

</button>

</p>



</div>


);


}


export default Login;
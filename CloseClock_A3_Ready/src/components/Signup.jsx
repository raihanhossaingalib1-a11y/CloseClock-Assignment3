import { useState } from "react";
import { auth } from "../firebase";

import {
  createUserWithEmailAndPassword
} from "firebase/auth";


function Signup(){

const [email,setEmail]=useState("");
const [password,setPassword]=useState("");



const signup=async()=>{

try{

await createUserWithEmailAndPassword(
auth,
email,
password
);

alert("Account created successfully");


}catch(error){

alert(error.message);

}

};



return(

<div>

<h2>Create Account</h2>


<input

placeholder="Email"

value={email}

onChange={(e)=>setEmail(e.target.value)}

/>


<input

placeholder="Password"

type="password"

value={password}

onChange={(e)=>setPassword(e.target.value)}

/>


<button onClick={signup}>

Sign Up

</button>


</div>

);


}


export default Signup;
import { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";


function Login({setUser, switchSignup}) {


const [email,setEmail] = useState("");
const [password,setPassword] = useState("");



const login = async()=>{

try{

const result = await signInWithEmailAndPassword(
    auth,
    email,
    password
);


setUser(result.user);


}

catch(error){

alert(error.message);

}

};



return (

<div className="login-page">


<div className="login-card">


<div className="brand-section">

<div className="login-logo">
⏰
</div>


<h1>
CloseClock
</h1>


<p>
Smart Productivity Manager
</p>

</div>



<div className="input-group">

<input

type="email"

placeholder="Enter your email"

value={email}

onChange={(e)=>setEmail(e.target.value)}

/>



<input

type="password"

placeholder="Enter your password"

value={password}

onChange={(e)=>setPassword(e.target.value)}

/>


</div>




<button 
className="login-button"
onClick={login}
>

Login

</button>




<p className="signup-text">

Don't have an account?

<span onClick={switchSignup}>
 Sign up
</span>


</p>



</div>


</div>

);


}


export default Login;
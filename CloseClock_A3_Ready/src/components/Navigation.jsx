import React from "react";
import "../App.css";


function Navigation({ user, onLogout }) {


return (

<nav className="nav-bar">


<div className="nav-logo">

<span className="nav-brand">

🕒 CloseClock

</span>

</div>





<div className="nav-links">


<a

className="nav-link nav-link-active"

href="#dashboard"

>

🏠 Dashboard

</a>



<a

className="nav-link"

href="#taskform"

>

➕ Add Task

</a>



<a

className="nav-link"

href="#analytics"

>

📊 Analytics

</a>



<a

className="nav-link"

href="#tasks"

>

✅ My Tasks

</a>



</div>







<div className="nav-user">


<span className="nav-username">

👤 {user?.email}

</span>



<button

className="nav-logout-btn"

onClick={onLogout}

aria-label="Logout"

>

Logout

</button>



</div>




</nav>


);


}


export default Navigation;
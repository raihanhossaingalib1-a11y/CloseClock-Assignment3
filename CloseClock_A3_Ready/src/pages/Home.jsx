import { useEffect, useState } from "react";
import "../App.css";

import { auth } from "../firebase";

async function apiRequest(path, options = {}) {
  const token = await auth.currentUser?.getIdToken();
  if (!token) throw new Error("Please log in again.");
  const response = await fetch(`/api/tasks${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...options.headers,
    },
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.detail || "Unable to contact the server");
  return data;
}

import DashboardCards from "../components/DashboardCards";
import ProfessionalStatsCard from "../components/ProfessionalStatsCard";
import TaskForm from "../components/TaskForm";
import TaskCard from "../components/TaskCard";
import Timer from "../components/Timer";

import ProductivityAnalytics from "../components/Analytics";
import UpcomingDeadlines from "../components/UpcomingDeadlines";
import Calendar from "../components/Calendar";
import Navigation from "../components/Navigation";



function Home({user, logout}) {


const [tasks,setTasks] = useState([]);

const [task,setTask] = useState("");

const [priority,setPriority] = useState("Medium");

const [category,setCategory] = useState("Study");

const [deadline,setDeadline] = useState("");

const [editingId,setEditingId] = useState(null);

const [loading,setLoading] = useState(false);



// PRODUCTIVITY SCORE

const productivity =
tasks.length === 0
? 0
: Math.round(
(tasks.filter(task => task.completed).length / tasks.length) * 100
);



useEffect(()=>{

if(user){

loadTasks();

}

},[user]);





// TASK DATA: React -> Python API -> Supabase
const loadTasks = async () => {
  try { setTasks(await apiRequest("")); }
  catch (error) { console.error(error); alert("Unable to load tasks: " + error.message); }
};

const clearForm = () => {
  setTask(""); setDeadline(""); setPriority("Medium");
  setCategory("Study"); setEditingId(null);
};

const addTask = async () => {
  if (!task.trim()) return alert("Enter task");
  try {
    setLoading(true);
    const created = await apiRequest("", {
      method: "POST",
      body: JSON.stringify({ text: task.trim(), priority, category, deadline: deadline || null }),
    });
    setTasks(prev => [...prev, created]);
    clearForm();
  } catch (error) { console.error(error); alert("Task could not be added: " + error.message); }
  finally { setLoading(false); }
};

const completeTask = async (id) => {
  try {
    const changed = await apiRequest(`/${id}`, {method:"PATCH", body: JSON.stringify({completed:true})});
    setTasks(prev => prev.map(item => item.id === id ? changed : item));
  } catch (error) { console.error(error); alert("Unable to complete task: " + error.message); }
};

const deleteTask = async (id) => {
  try {
    await apiRequest(`/${id}`, { method: "DELETE" });
    setTasks(prev => prev.filter(item => item.id !== id));
  } catch (error) { console.error(error); alert("Unable to delete task: " + error.message); }
};

const editTask = (item) => {
  setEditingId(item.id); setTask(item.text); setPriority(item.priority);
  setCategory(item.category); setDeadline(item.deadline || "");
};

const updateTask = async () => {
  if (!task.trim()) return alert("Enter task");
  try {
    const changed = await apiRequest(`/${editingId}`, {
      method: "PATCH", body: JSON.stringify({text:task.trim(), priority, category, deadline:deadline || null}),
    });
    setTasks(prev => prev.map(item => item.id === editingId ? changed : item));
    clearForm();
  } catch (error) { console.error(error); alert("Unable to update task: " + error.message); }
};

return (

<div className="premium-dashboard-root">



<Navigation

user={user}

onLogout={logout}

/>





<header className="hero-section">


<div className="hero-main">


<h1 className="hero-title">

Welcome back{user?.email ? `, ${user.email}` : ""}!

</h1>



<p className="hero-summary">

Stay on top of your goals with your personal productivity assistant.

<br/>

Plan, analyze, and accomplish more professionally.

</p>





<a

href="#taskform"

className="hero-cta"

>

+ Add Your Next Task

</a>



</div>




<div className="hero-graphic">

<span className="hero-icon">

🚀

</span>

</div>



</header>










<div className="premium-dashboard-grid">



<div className="premium-maincol">






<section className="premium-cards-panel">


<ProfessionalStatsCard

icon="📈"

title="Productivity Score"

value={`${productivity}%`}

caption="Overall task completion performance"

/>



<DashboardCards

tasks={tasks}

/>


</section>









<section className="premium-analytics-panel">


<ProductivityAnalytics

tasks={tasks}

/>


</section>









<section

className="premium-form-panel"

id="taskform"

>


<TaskForm



task={task}

setTask={setTask}



priority={priority}

setPriority={setPriority}



category={category}

setCategory={setCategory}



deadline={deadline}

setDeadline={setDeadline}



addTask={

editingId

?

updateTask

:

addTask

}



/>


</section>









<section className="premium-tasklist-panel">


<h2>

Your Tasks

</h2>




{

tasks.length===0

?

<div className="empty-state-card">

<h3>

📂 No tasks yet

</h3>


<p>

Add your first task to get started!

</p>


</div>



:



<div className="task-list">


{

tasks.map(item=>(


<TaskCard

key={item.id}

item={item}

completeTask={completeTask}

deleteTask={deleteTask}

editTask={editTask}

/>



))


}



</div>



}



</section>








</div>








<aside className="premium-sidecar">



<UpcomingDeadlines

tasks={tasks}

/>





<Calendar />





<Timer />





</aside>







</div>







</div>


);


}



export default Home;
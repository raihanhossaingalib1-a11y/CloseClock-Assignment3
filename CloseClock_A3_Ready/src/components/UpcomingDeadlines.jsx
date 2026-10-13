import "./UpcomingDeadlines.css";


function UpcomingDeadlines({tasks}){


const upcomingTasks = tasks
.filter(
    task =>
        task.deadline &&
        !task.completed
)
.sort(
    (a,b)=>
        new Date(a.deadline)-new Date(b.deadline)
)
.slice(0,5);



return(

<div className="deadline-container">


<h3>
Upcoming Deadlines
</h3>



{
upcomingTasks.length===0 ?

<p>
No upcoming deadlines
</p>


:

upcomingTasks.map(task=>(


<div 
key={task.id}
className="deadline-item"
>


<strong>
📅 {task.text}
</strong>


<p>
Due: {task.deadline}
</p>


<p>
Priority: {task.priority}
</p>


<span>
🟢 Upcoming
</span>


</div>


))


}


</div>

);


}


export default UpcomingDeadlines;
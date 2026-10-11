function UpcomingTasks({tasks}){


const today = new Date();



const sortedTasks = [...tasks]
.filter(task=>task.deadline)
.sort(
(a,b)=>
new Date(a.deadline)-new Date(b.deadline)
);





const getStatus=(date)=>{


const deadline = new Date(date);


const difference =
Math.ceil(
(deadline-today)/(1000*60*60*24)
);



if(difference < 0){

return "🔴 Overdue";

}


if(difference <=3){

return "🟡 Due Soon";

}


return "🟢 Upcoming";


};





return(

<div className="analytics-card">


<h2>
Upcoming Deadlines
</h2>



{

sortedTasks.length===0

?

<p>
No upcoming deadlines
</p>


:


sortedTasks.slice(0,5).map(task=>(


<div className="upcoming-task" key={task.id}>


<h4>

📅 {task.text}

</h4>



<p>
Due: {task.deadline}
</p>


<p>
Priority: {task.priority}
</p>


<p>
{getStatus(task.deadline)}
</p>


</div>



))


}



</div>

)


}



export default UpcomingTasks;
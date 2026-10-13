function Analytics({tasks}){


const total = tasks.length;


const completed = tasks.filter(
task=>task.completed
).length;



const productivity = total===0
?
0
:
Math.round(
(completed/total)*100
);




const high =
tasks.filter(
task=>task.priority==="High"
).length;



const medium =
tasks.filter(
task=>task.priority==="Medium"
).length;



const low =
tasks.filter(
task=>task.priority==="Low"
).length;





const study =
tasks.filter(
task=>task.category==="Study"
).length;



const work =
tasks.filter(
task=>task.category==="Work"
).length;



const personal =
tasks.filter(
task=>task.category==="Personal"
).length;






// PRODUCTIVITY MESSAGE

let message = "";

if(productivity === 0){

message =
"Start completing tasks to build your productivity score.";

}
else if(productivity < 50){

message =
"Good start! Keep completing tasks to improve your productivity.";

}
else if(productivity < 80){

message =
"Great progress! You are maintaining a productive workflow.";

}
else{

message =
"Excellent performance! You are highly productive.";

}





return(

<div className="analytics-card">



<h2>
📊 Productivity Analytics
</h2>



<p className="analytics-description">

Track your progress, completion rate, priorities,
and task distribution in one place.

</p>







<div className="analytics-item">


<h4>
Completion Rate
</h4>



<p>
{completed} / {total} Tasks Completed
</p>




<div className="progress-bar">


<div

className="progress-fill"

style={{
width:`${productivity}%`
}}

>

</div>


</div>




<p>

{productivity}% Complete

</p>



<p className="productivity-message">

💡 {message}

</p>



</div>









<div className="analytics-item">


<h4>
Priority Breakdown
</h4>



<p>
🔴 High Priority : {high}
</p>


<p>
🟡 Medium Priority : {medium}
</p>


<p>
🟢 Low Priority : {low}
</p>



</div>









<div className="analytics-item">


<h4>
Category Breakdown
</h4>



<p>
📚 Study Tasks : {study}
</p>


<p>
💼 Work Tasks : {work}
</p>


<p>
🏠 Personal Tasks : {personal}
</p>



</div>






</div>


)


}


export default Analytics;
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





return(

<div className="analytics-card">


<h2>
Productivity Analytics
</h2>



<div className="analytics-item">

<h4>
Completion Rate
</h4>


<p>
{completed} / {total} Tasks
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


</div>





<div className="analytics-item">

<h4>
Priority Breakdown
</h4>


<p>
🔴 High : {high}
</p>


<p>
🟡 Medium : {medium}
</p>


<p>
🟢 Low : {low}
</p>


</div>






<div className="analytics-item">


<h4>
Category Breakdown
</h4>


<p>
📚 Study : {study}
</p>


<p>
💼 Work : {work}
</p>


<p>
🏠 Personal : {personal}
</p>


</div>




</div>


)


}


export default Analytics;
import React from "react";


function getDeadlineStatus(deadline, completed) {

  if (!deadline) return "";


  const today = new Date();

  const due = new Date(deadline);


  const diff = Math.ceil(
    (due - today) /
    (1000 * 60 * 60 * 24)
  );


  if (completed)
    return "Completed";


  if (diff < 0)
    return "Overdue";


  if (diff === 0)
    return "Today";


  if (diff === 1)
    return "Tomorrow";


  return `Due in ${diff} days`;

}



function TaskCard({

item,
completeTask,
deleteTask,
editTask

}) {


const deadlineStatus =
getDeadlineStatus(
item.deadline,
item.completed
);



const isOverdue =
deadlineStatus === "Overdue";



return (

<div
className={`task-card-modern ${
item.completed ? "completed" : ""
}`}

>


<div className="task-header-modern">


<div className="task-check-area">


<input

type="checkbox"

checked={item.completed}

onChange={() =>
completeTask(item.id)
}

/>


</div>



<div className="task-content-modern">


<h3>

{item.text}

</h3>



{item.description &&

<p className="task-description">

{item.description}

</p>

}



<div className="task-meta">


<span
className={`priority-pill ${item.priority.toLowerCase()}`}
>

{item.priority}

</span>



<span className="category-pill">

{item.category}

</span>



{
item.deadline &&

<span
className={`deadline-pill ${
isOverdue ? "overdue" : ""
}`}
>

📅 {deadlineStatus}

</span>

}


</div>


</div>



<div className="task-action-modern">


<button

className="task-edit"

onClick={() =>
editTask(item)
}

>

✏️

</button>



<button

className="task-delete"

onClick={() =>
deleteTask(item.id)
}

>

🗑️

</button>


</div>


</div>


</div>

);


}


export default TaskCard;
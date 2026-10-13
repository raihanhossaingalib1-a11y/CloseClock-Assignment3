import React from "react";


function getDeadlineStatus(deadline, completed) {

  if (!deadline) return "";


  if (completed)
    return "Completed";


  const today = new Date();
  today.setHours(0,0,0,0);


  const due = new Date(deadline);
  due.setHours(0,0,0,0);



  const diff = Math.ceil(
    (due - today) /
    (1000 * 60 * 60 * 24)
  );



  if (diff < 0)
    return "Overdue";


  if (diff === 0)
    return "Due Today";


  if (diff === 1)
    return "Due Tomorrow";


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

disabled={item.completed}

onChange={() =>
completeTask(item.id)
}

/>


</div>







<div className="task-content-modern">



<h3>

{item.text}

{item.completed && " ✅"}

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

Priority: {item.priority}

</span>






<span className="category-pill">

Category: {item.category}

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





{

!item.completed &&

<button

className="task-edit"

onClick={() =>
editTask(item)
}

>

✏️ Edit

</button>

}







<button

className="task-delete"

onClick={() =>
deleteTask(item.id)
}

>

🗑️ Delete

</button>






</div>







</div>



</div>


);


}


export default TaskCard;
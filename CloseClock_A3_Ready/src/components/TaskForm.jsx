import React from "react";
import InputField from "./InputField";


function TaskForm({

task,
setTask,

priority,
setPriority,

category,
setCategory,

deadline,
setDeadline,

addTask

}) {


return (

<div className="task-form-modern">


<div className="form-header">

<h2>
Add New Task
</h2>

<p>
Create and organize your daily goals
</p>

</div>




<div className="form-grid">


<div className="form-group full-width">


<label>
Task Name
</label>


<InputField

placeholder="Enter task"

value={task}

setValue={setTask}

/>


</div>





<div className="form-group">


<label>
Priority
</label>


<select

value={priority}

onChange={(e)=>setPriority(e.target.value)}

>

<option value="High">
High
</option>


<option value="Medium">
Medium
</option>


<option value="Low">
Low
</option>


</select>


</div>







<div className="form-group">


<label>
Category
</label>


<select

value={category}

onChange={(e)=>setCategory(e.target.value)}

>


<option value="Study">
Study
</option>


<option value="Work">
Work
</option>


<option value="Personal">
Personal
</option>


</select>


</div>








<div className="form-group">


<label>
Deadline
</label>


<input

type="date"

value={deadline}

onChange={(e)=>setDeadline(e.target.value)}

/>


</div>




</div>






<button

className="create-task-btn"

onClick={addTask}

>

🚀 Add Task

</button>




</div>

);


}


export default TaskForm;
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

addTask,

isEditing,

loading

}) {



const clearForm = () => {

setTask("");

setPriority("Medium");

setCategory("Study");

setDeadline("");

};





return (

<div className="task-form-modern">



<div className="form-header">


<h2>

{isEditing ? "Update Task ✏️" : "Add New Task 🚀"}

</h2>



<p>

Create, organise, and track your daily goals with priorities and deadlines.

</p>


</div>









<div className="form-grid">





<div className="form-group full-width">


<label>

Task Name *

</label>



<InputField


placeholder="Example: Complete Assignment 3"

value={task}

setValue={setTask}

/>



<small>

Enter a clear task description to track your progress.

</small>



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



<small>

Adding deadlines helps improve task planning.

</small>



</div>







</div>









<div className="form-actions">





<button


className="create-task-btn"

onClick={addTask}

disabled={loading}


>



{

loading

?

"Saving..."

:

isEditing

?

"✏️ Update Task"

:

"🚀 Add Task"

}



</button>









<button


className="clear-task-btn"

onClick={clearForm}

type="button"


>


Clear


</button>









<a


href="#dashboard"

className="back-dashboard-btn"


>


⬅ Back to Dashboard


</a>






</div>








</div>

);


}


export default TaskForm;
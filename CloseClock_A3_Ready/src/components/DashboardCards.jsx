import React from "react";

function DashboardCards({ tasks }) {

  const completed = tasks.filter(
    (task) => task.completed
  ).length;


  const overdue = tasks.filter((task) => {

    if (!task.deadline) return false;

    const d = new Date(task.deadline);

    return !task.completed && d < new Date();

  }).length;


  const pending = tasks.filter(
    (task) =>
      !task.completed &&
      (!task.deadline || new Date(task.deadline) >= new Date())
  ).length;


  const productivity =
    tasks.length === 0
      ? 0
      : Math.round((completed / tasks.length) * 100);



  const cards = [

    {
      title:"Total Tasks",
      value:tasks.length,
      icon:"📋",
      className:"total"
    },

    {
      title:"Completed",
      value:completed,
      icon:"✅",
      className:"completed"
    },

    {
      title:"Pending",
      value:pending,
      icon:"⏳",
      className:"pending"
    },

    {
      title:"Overdue",
      value:overdue,
      icon:"⚠️",
      className:"overdue"
    },

    {
      title:"Productivity",
      value:`${productivity}%`,
      icon:"🚀",
      className:"productivity"
    }

  ];



  return (

    <div className="dashboard-stats-grid">

      {
        cards.map((card)=>(

          <div 
            key={card.title}
            className={`dashboard-stat-card ${card.className}`}
          >

            <div className="stat-icon">
              {card.icon}
            </div>


            <div className="stat-content">

              <p className="stat-title">
                {card.title}
              </p>


              <h2 className="stat-value">
                {card.value}
              </h2>

            </div>


          </div>

        ))
      }


    </div>

  );

}


export default DashboardCards;
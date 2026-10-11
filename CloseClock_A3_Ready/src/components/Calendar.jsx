import { useState } from "react";
import "./Calendar.css";

function Calendar() {

  const [date, setDate] = useState(new Date());


  const month = date.toLocaleString("default", {
    month: "long"
  });

  const year = date.getFullYear();


  const daysInMonth = new Date(
    year,
    date.getMonth() + 1,
    0
  ).getDate();


  const firstDay = new Date(
    year,
    date.getMonth(),
    1
  ).getDay();



  const previousMonth = () => {

    setDate(
      new Date(
        year,
        date.getMonth() - 1,
        1
      )
    );

  };


  const nextMonth = () => {

    setDate(
      new Date(
        year,
        date.getMonth() + 1,
        1
      )
    );

  };



  const days = [];


  // Empty spaces before first day

  for(let i=0;i<firstDay;i++){

    days.push(
      <div 
        key={"empty"+i}
        className="empty-day"
      >

      </div>
    );

  }



  // Actual dates

  for(let i=1;i<=daysInMonth;i++){

    days.push(

      <div 
        key={i}
        className="calendar-day"
      >

        {i}

      </div>

    );

  }



  return (

    <div className="calendar-container">


      <h3>
        Calendar
      </h3>


      <div className="calendar-header">


        <button onClick={previousMonth}>
          ◀
        </button>


        <h4>
          {month} {year}
        </h4>


        <button onClick={nextMonth}>
          ▶
        </button>


      </div>




      <div className="weekdays">

        {
          [
            "Sun",
            "Mon",
            "Tue",
            "Wed",
            "Thu",
            "Fri",
            "Sat"
          ].map(day=>(

            <div key={day}>
              {day}
            </div>

          ))
        }


      </div>




      <div className="calendar-grid">

        {days}

      </div>



    </div>

  );


}


export default Calendar;
import { useEffect, useState } from "react";


function Timer(){


const [time,setTime] = useState(25 * 60);

const [running,setRunning] = useState(false);



useEffect(()=>{


let interval;


if(running){


interval=setInterval(()=>{


setTime(prev=>{


if(prev<=0){

setRunning(false);

return 0;

}


return prev-1;


});


},1000);


}



return ()=>clearInterval(interval);



},[running]);







const startTimer=()=>{

setRunning(true);

};



const pauseTimer=()=>{

setRunning(false);

};



const resetTimer=()=>{

setRunning(false);

setTime(25*60);

};








const minutes=Math.floor(time/60);

const seconds=time%60;






return(


<div className="timer">


<h2>
Focus Timer
</h2>



<div className="timer-display">

{String(minutes).padStart(2,"0")}:
{String(seconds).padStart(2,"0")}

</div>





<div className="timer-buttons">


<button onClick={startTimer}>

Start

</button>



<button onClick={pauseTimer}>

Pause

</button>




<button onClick={resetTimer}>

Reset

</button>


</div>



</div>


);


}



export default Timer;
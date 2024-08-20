import logo from './logo.svg';
import './App.css';
import React,{useState,useRef} from 'react';

// start stop pause reset
function App() {
  const [time,setTime] = useState(0)
  const timer = useRef(null)

  const onStart=()=>{
    if(timer.current){
      clearInterval(timer.current)
     }
     if(time!=0){
      setTime(0)
     }
    timer.current = setInterval(()=>{
     setTime(prev=>prev+1)
    },1000)
  }

  const onStop=()=>{
   setTime(0)
   if(timer.current){
    clearInterval(timer.current)
   }
  }

  const onPause=()=>{
    if(timer.current){
     clearInterval(timer.current)
    }
   }
   const onReset=()=>{
      if(time>0){
        onStart()
      }
   }
  return (
   <div style={{justifyContent:'center',alignSelf:'center'}}>
    <p style={{fontSize:20}}>{time}</p>
    <button onClick={()=>onStart()}>Start</button>
    <button onClick={()=>onStop()}>Stop</button>
    <button onClick={()=>onPause()}>Pause</button>
    <button onClick={()=>onReset()}>Restart</button>
   </div>
  );
}

export default App;

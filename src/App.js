import React,{useState,useRef,useEffect} from 'react';


const Toast =(props)=>{
  const {onClose,timer} = props
  const [showTime,setShowTime] = useState(timer)

  useEffect(()=>{
     let intervalTime = setInterval(()=>{
        setShowTime(prev=>{
          if(prev <=0){
            clearInterval(intervalTime)
            onClose()
            return 0
          }
          else return prev-1
        })
      },1000)

    // Cleanup interval on component unmount
    return () => clearInterval(intervalTime);
  },[onClose])


  return(
    <div style={{marginRight:15,backgroundColor:'skyblue',paddingInline:15,marginTop:10,paddingBlock:3,alignSelf:'center'}}>
      <h3 style={{textAlign:'center'}}>This is Toast</h3>
      <h4 style={{textAlign:'center'}}>{showTime}</h4>
      <button style={{}} onClick={onClose}>close</button>
    </div>
  )
}

// start stop pause reset
function App() {
  const [time,setTime] = useState(0)
  const timer = useRef(null)
  const [toasts,setToasts] = useState([])

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

  const onShowToast = ()=>{
    setToasts(prev=>[...prev,{timer:10,id:Math.random()}])
  }
  const onCloseToast =(id)=>{
    let filteredToasts = [...toasts].filter((i)=>i.id!=id)
    setToasts(filteredToasts)
  }

  return (
    <div>
   <div style={{justifyContent:'center',display:'flex',height:'100%',alignItems:'center'}}>
    <div style={{display:'flex',alignItems:'center',margin:20}}>
     <p>Timer:</p> 
    <p style={{fontSize:20}}>{time}</p>
    </div>
    <div style={{}}>
    <button onClick={()=>onStart()}>Start</button>
    <button onClick={()=>onStop()}>Stop</button>
    <button onClick={()=>onPause()}>Pause</button>
    <button onClick={()=>onReset()}>Restart</button>
    </div>
   </div>
   <div style={{alignSelf:'center',display:'flex',justifyContent:'center'}}>
    <button onClick={onShowToast}>Show Toast</button>
   </div>
   <div style={{width:'auto',right:0,position:'absolute',top:0}}>
   {toasts.map((i,index)=>{
    return(
      <div key={i.id} style={{}}>
      <Toast onClose={()=>onCloseToast(i.id)} timer={i.timer}/>
      </div>
    )
   })}
   </div>
   </div>
  );
}

export default App;

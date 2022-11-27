import React from 'react'
import { useState, useEffect} from "react";

export const UseEffectPrac = () => {
    const [count, setCount] = useState(0);
    const [name, setName] = useState("");
    console.count('render')
    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
      // Update the document title using the browser API
     // document.title = `You clicked ${count} times`;
      console.count('effect')
    },[count]);
  
    
  
  return (
    <div>
    <div className='TitleofFunction'>4.useEffectPractice</div>
    <div className='flex justify-center'>
        <p>You clicked {count} times</p>
        <button onClick={() => setCount((prev)=> prev+ 1)} className="btnGray ml-10">
          Click me
        </button>
        <input onChange={(e) => setName(e.target.value)} value={name} className="text-black h-full">
        </input>
      </div>
    </div>
  )
}

 
import React, { useState } from 'react'
import { ButtonAddNums } from "./FunctionsDetail"
import { MapPrac } from "./FunctionsDetail"
import  {CRUD}  from "./FunctionsDetail"
import { UseEffectPrac } from './UseEffectPrac'

const a = `<img src='???' onerror='alert(\"hack"\)' /> `;
const b = `<script> <img src=??? onerror={alert("h")} </script>`
const Functions = () => {
  const [t,setT] = useState()

  return (
    <div className='content'>
        <div className=''><ButtonAddNums /></div>
        <div className=''><MapPrac /></div>
        <div className=''><CRUD /></div>
        <div className='text-white mt-10'> test 
        <input className='text-black ml-10' onChange={(e)=> setT(e.target.value)} />
        <div className='pl-15'>
          {t} 
        {/* <a href={t} className="text-white">{t}</a>  */}
        </div>
        </div>
    </div>
  )
}

export default Functions
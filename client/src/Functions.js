import React from 'react'
import { ButtonAddNums } from "./FunctionsDetail"
import { MapPrac } from "./FunctionsDetail"
import  {CRUD}  from "./FunctionsDetail"
import { UseEffectPrac } from './UseEffectPrac'

const Functions = () => {
  
  return (
    <div className='content'>
        <div className=''><ButtonAddNums /></div>
        <div className=''><MapPrac /></div>
        <div className=''><CRUD /></div>
    </div>
  )
}

export default Functions
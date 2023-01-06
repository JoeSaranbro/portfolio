import React from 'react'
import Prac_Home from './Prac_Home'
import Prac_Navbar from './Prac_Navbar'
import './prac.css'



const Prac_React = () => {
  return (
    <div className='prac_container'>
    <Prac_Navbar />
    <div className='prac_content'>
      <Prac_Home />
    </div>
  </div>
  )
}

export default Prac_React
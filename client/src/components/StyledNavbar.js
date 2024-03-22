import { useState } from 'react';
import {NavLink} from 'react-router-dom'
import { useRef } from 'react';

import { Squash as Hamburger } from "hamburger-react";
import { AnimatePresence, motion } from "framer-motion";

const StyledNavbar = () => {

  const checkIfActive = ({isActive}) => {
    
    return isActive ?'underline bg-slate-600 rounded-lg px-2 py-2':'hover:bg-slate-600 rounded-lg px-2 py-2'
  }
  
  const hamburger_nav_list = useRef()

  const [isOpen, setOpen] = useState(false);
  console.log(isOpen)

  return (
    
    <nav className='top-navbar h-14'>
      
      <div className='div-navbar-desktop h-full align-middle '>
          
          <ul className='top-navbar-desktop h-full items-center' >
            {/* <li><img src={reactIcon} className='h-11' alt="Logo"/></li> */}
            
            <li><NavLink to='/portfolio' className={checkIfActive}>Home</NavLink></li>
            <li><NavLink to='/portfolio_2' className={checkIfActive}>Portfolio_2</NavLink></li>
            <li><NavLink to='/functions' className={checkIfActive}>Functions</NavLink></li>
            <li><NavLink to='/todo_items' className={checkIfActive}>todo</NavLink></li>
            <li><NavLink to='/login' className={checkIfActive}>Login</NavLink></li>
            <li><NavLink to='/prac_home' className={checkIfActive}>Prac_React</NavLink></li>
          </ul>
          
        
        <hr className='border-t-2 w-full'/>
      </div>
      {/* ต่อhamburger navbar ลอย */}
      <div className={`hamburger-nav ${isOpen ? "" : "justify-end" }`} >
        
        {isOpen && (<div className='hamburger-nav-list'>
          <ul className='hamburger-nav-ul' ref={hamburger_nav_list}>
            
            
            <li><NavLink to='/portfolio' className={checkIfActive}>Home</NavLink></li>
            <li><NavLink to='/portfolio_2' className={checkIfActive}>Portfolio_2</NavLink></li>
            <li><NavLink to='/functions' className={checkIfActive}>Functions</NavLink></li>
            <li><NavLink to='/todo_items' className={checkIfActive}>todo</NavLink></li>
            <li><NavLink to='/login' className={checkIfActive}>Login</NavLink></li>
            <li><NavLink to='/prac_home' className={checkIfActive}>Prac_React</NavLink></li>
          </ul>
          
        </div>)}
        <div className=''>
          <Hamburger toggled={isOpen} size={20} toggle={setOpen}  />
        </div>
      
      </div>
    </nav>
    
  );
};

export default StyledNavbar


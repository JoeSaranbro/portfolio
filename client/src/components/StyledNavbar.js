import {NavLink} from 'react-router-dom'
import logo from './fb_profile.jpg';
import reactIcon from './svg_logo192.svg'

const StyledNavbar = () => {
  const checkIfActive = ({isActive}) => {
    return isActive?'underline bg-slate-600 rounded-lg px-2 py-2':'hover:bg-slate-600 rounded-lg px-2 py-2'
  }
  return (
    
    <nav className='flex w-full text-slate-900 dark:text-white text-xl font-medium tracking-tight '>
      <div className=''>
        
          <ul className='flex gap-10 pt-3 ml-4' >
            <li><img src={reactIcon} className='h-11' alt="Logo"/></li>
            <li><NavLink to='/portfolio' className={checkIfActive}>Home</NavLink></li>
            <li><NavLink to='/portfolio_2' className={checkIfActive}>Portfolio_2</NavLink></li>
            <li><NavLink to='/functions' className={checkIfActive}>Functions</NavLink></li>
            <li><NavLink to='/todo_items' className={checkIfActive}>todo</NavLink></li>
            <li><NavLink to='/login' className={checkIfActive}>Login</NavLink></li>
            <li><NavLink to='/prac_home' className={checkIfActive}>Prac_React</NavLink></li>
          </ul>
          
        
        <hr className='border-t-2 w-full'/>
      </div>
    </nav>
    
  );
};

export default StyledNavbar


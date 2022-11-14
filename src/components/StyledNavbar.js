import {NavLink} from 'react-router-dom'
import logo from './fb_profile.jpg';
import reactIcon from './logo192.png'

const StyledNavbar = () => {
  const checkIfActive = ({isActive}) => {
    return isActive?'underline bg-slate-600 rounded-lg px-2 py-2':'hover:bg-slate-600 rounded-lg px-2 py-2'
  }
  return (
    
    <nav className='text-slate-900 dark:text-white  text-xl font-medium tracking-tight '>
      <div className=''>
        <div className=''>
          <ul className='flex gap-10 pt-3 ml-4' >
            <li><img src={reactIcon} class='h-11 w-auto' alt="Logo"/></li>
            <li><NavLink to='/portfolio' className={checkIfActive}>Home</NavLink></li>
            <li><NavLink to='/mapprac' className={checkIfActive}>Map Practice</NavLink></li>
            <li><NavLink to='/btnaddnums' className={checkIfActive}>Button Add Numbers</NavLink></li>
            <li><NavLink to='/crud' className={checkIfActive}>CRUD</NavLink></li>
            <li><NavLink to='/functions' className={checkIfActive}>Functions</NavLink></li>
            <li><NavLink to='/login' className={checkIfActive}>Login</NavLink></li>
          </ul>
          
        </div>
        <hr className='w-full border-2'/>
      </div>
    </nav>
    
  );
};

export default StyledNavbar

{/* <div className='w-screen h-[80px] z-10 bg-zinc-200 fixed drop-shadow-lg'> 
        <div className='px-2 flex justify-between items-center w-full h-full'>
            <div className='flex items-center'>
                <h1 className='text-3xl font-bold mr-4 sm:text-4xl'>BRAND.</h1>
                <ul className='hidden md:flex '>
                    <li>Home</li>
                    <li>About</li>
                    <li>Support</li>
                    <li>Platforms</li>
                    <li>Pricing</li>

                </ul>
            </div>
            <div className='hidden md:flex pr-4'>
                <button className='border-none bg-transparent text-black mr-4'>Sign in</button>
                <button className='px-8 py-3'>Sign Up</button>
                
            </div>
            <div className='md:hidden' onClick={handleClick}>
                {!nav ? <MenuIcon className='w-5'/> : <XIcon className='w-5'/>}
                

            </div>
        </div>
        <ul className={!nav ? 'hidden': 'absolute bg-zinc-200 w-full px-8'}>
            <li className='border-b-2 border-zinc-300 w-full'>Home</li>
            <li className='border-b-2 border-zinc-300 w-full'>About</li>
            <li className='border-b-2 border-zinc-300 w-full'>Support</li>
            <li className='border-b-2 border-zinc-300 w-full'>Platforms</li>
            <li className='border-b-2 border-zinc-300 w-full'>Pricing</li>
            <div className='flex flex-col my-4'>
                <button className='bg-transparent text-indigo-600 px-8 py-3 mb-4'>Sign In</button>
                <button className='px-8 py-3'>Sign Up</button>
            </div>


        </ul>
        
     </div> */}
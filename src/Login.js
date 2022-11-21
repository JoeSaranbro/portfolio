import { useState ,useRef, useEffect, useContext } from 'react';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const userRef = useRef();
  const errRef = useRef();
  const ref = useRef();

  const [userName, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [isModalOpen, setModal] = useState(false);
  
  
  console.log("signup =  " +isSignup)
  
  useEffect(() => {
    userRef.current.focus();
}, [])

  useEffect(()=> {
    setErrMsg('')
  }, [userName, pwd]);

  
 
  
  

  const LoginForm = () => {
      
      return (
      <div id="loginModal" className="modal" style={isModalOpen === true ? {display: "block"}:{display: "none"}}>
        <div ref={ref} className="modal-content-login ">
          <div id="header" className='text-center'>
          <span className='text-2xl font-bold'>Login<span className="close rounded-lg" onClick={(e)=> {setModal(false)}}>&times;</span></span>
          
          <hr className='mt-4 border-2'/>
          </div>
          
          <div className=''>
          <form className='form'>
            <div className='form-col'>
              <label htmlFor='username' className='form-label'>
                Username/Email
              </label>
              <input
                type='text'
                id='username'
                className='form-input'
                ref={userRef}
                value={userName}
                onChange={(e) => setUser(e.target.value)}
              />
            </div>
            <div className='form-col'>
              <label htmlFor='password' className='form-label'>
                Password
              </label>
              <input
                type='password'
                className='form-input'
                id='password'
                value={pwd}
                onChange={(e) => setPwd(e.target.value)}
              />
              <div className="mt-2 text-base text-blue-600 hover:text-blue-800 hover:underline"><Link to="/portfolio">Forgot Password?</Link></div>
            </div>
            <div className='mt-4'>
            <button type='submit' className='form-button-login'>
              <p>Login</p>
            </button>
            <button type="button" onClick={()=> {setIsSignup(true)}} className='ml-4 form-button-signup'>
            <p>Sign up</p>
            </button>
            </div>
            
        </form>
          </div>
        </div>
    </div>
    )}
  
    const SignUpForm = () => {
      return (
      <div id="signupModal" className="modal" style={isModalOpen === true ? {display: "block"}:{display: "none"}}>
        <div ref={ref} className="modal-content-register ">
          <div id="header" className='text-center'>
          <span className='text-2xl font-bold'>Sign up<span className="close rounded-lg" onClick={(e)=> {(setModal(false))(setIsSignup(false))}}>&times;</span></span>
          
          <hr className='mt-4 border-2'/>
          </div>
          
          <div className=''>
          <form className='form'>
            <div className='form-col'>
              <label htmlFor='username' className='form-label'>
                Username
              </label>
              <input
                type='text'
                id='username'
                className='form-input'
                ref={userRef}
                value={userName}
                onChange={(e) => setUser(e.target.value)}
              />
            </div>
            <div className='form-col'>
              <label htmlFor='email' className='form-label'>
                Email
              </label>
              <input
                type='email'
                id='email'
                className='form-input'
                ref={userRef}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className='form-col'>
              <label htmlFor='password' className='form-label'>
                Password
              </label>
              <input
                type='password'
                className='form-input'
                id='password'
                value={pwd}
                onChange={(e) => setPwd(e.target.value)}
              />
            </div>
            <div className='mt-4'>
            <button onClick={()=> {setIsSignup(false)}} type='submit' className='form-button-login'>
              <p>Back to Login</p>
            </button>
            <button onClick={(e)=> {e.preventDefault()}} className='ml-4 form-button-signup'>
            <p>Sign up</p>
            </button>
            </div>
            
        </form>
          </div>
        </div>
    </div>
    )}
  
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        document.getElementById("openmodal").blur();
        console.log(document.getElementById("openmodal"))
        setModal(false);
        setIsSignup(false);
      }
    };
  
    const handleClickOutside = (event) => {
      if (!ref.current.contains(event.target)) {
        setModal(false);
        setIsSignup(false);
       // console.log(ref)
        
      }
    };
  
    useEffect(() => {
      document.addEventListener("keydown", handleEsc, true);
      document.addEventListener("click", handleClickOutside, true);
      document.addEventListener("touchend", handleClickOutside, true);
      return () => {
        document.removeEventListener("keydown", handleEsc, true);
        document.removeEventListener("click", handleClickOutside, true);
        document.removeEventListener("touchend", handleClickOutside, true);
      };
    });
  
    
  
  

  
  
  
 
   

  return (
    <div className='h-screen'>
      <div>
      <button id="openmodal" onClick={()=> setModal(true)} className="btnGray">Login</button>
      {isSignup ? <SignUpForm/>:<LoginForm/>}
      
      
      
      
        
        </div>
      <h2>1111111111111</h2>
      
    </div>
  );
};
export default Login;

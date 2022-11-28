import { useState ,useRef, useEffect, useContext } from 'react';
import AuthContext from './context/AuthProvider';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const { setAuth } = useContext(AuthContext);
  const userRef = useRef();
  const errRef = useRef();
  const ref = useRef();

  const LoginAndSignupInitialValue = {id:"",username:"",email:"",password:""}
  const [inputSignup, setInputSignup] = useState(LoginAndSignupInitialValue)
  const [inputLogin, setInputLogin] = useState(LoginAndSignupInitialValue)
  const [userName, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [isModalOpen, setModal] = useState(false);
  
  
  
  
  useEffect(() => {
    userRef.current.focus();
}, [])

  useEffect(()=> {
    setErrMsg('')
  }, [userName, pwd]);

  
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
  }

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
  }
  
  

  const LoginForm = () => {
      
      return (
      <div id="loginModal" className="modal" style={isModalOpen === true ? {display: "block"}:{display: "none"}}>
        <div ref={ref} className="modal-content-login ">
          <div id="header" className='text-center'>
          <span className='text-2xl font-bold'>Login<span className="close rounded-lg" onClick={(e)=> {setModal(false)}}>&times;</span></span>
          
          <hr className='mt-4 border-2'/>
          </div>
          
          <div className=''>
          <form onSubmit={handleLoginSubmit} className='form'>
            <div className='form-col'>
              <label htmlFor='username' className='form-label'>
                Username/Email
              </label>
              <input
                type='text'
                id='username'
                className='form-input'
                ref={userRef}
                value={inputLogin.username}
                onChange={(e) => setInputLogin({...inputLogin,username:e.target.value})}
                required
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
                value={inputLogin.password}
                onChange={(e) => setInputLogin({...inputLogin,password:e.target.value})}
                required
              />
              <div className="mt-2 text-base text-blue-600 hover:text-blue-800 hover:underline"><Link to="/portfolio">Forgot Password?</Link></div>
            </div>
            <div className='mt-4'>
            <button type='submit' className='form-button-login'>
              <p>Login</p>
            </button>
            <button type="button" onClick={()=> {setIsSignup(true);setInputLogin(LoginAndSignupInitialValue);}} className='ml-4 form-button-signup'>
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
        <div ref={ref} className="modal-content-signup ">
          <div id="header" className='text-center'>
          <span className='text-2xl font-bold'>Sign up<span className="close rounded-lg" onClick={(e)=> {(setModal(false))(setIsSignup(false))}}>&times;</span></span>
          
          <hr className='mt-4 border-2'/>
          </div>
          
          <div className=''>
          <form onSubmit={handleSignupSubmit} className='form'>
            <div className='form-col'>
              <label htmlFor='username' className='form-label'>
                Username
              </label>
              <input
                type='text'
                id='username'
                className='form-input'
                ref={userRef}
                value={inputSignup.username}
                onChange={(e) => setInputSignup({...inputSignup,username:e.target.value})}
                required
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
                value={inputSignup.email}
                onChange={(e) => setInputSignup({...inputSignup,email:e.target.value})}
                required
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
                value={inputSignup.password}
                onChange={(e) => setInputSignup({...inputSignup,password:e.target.value})}
                required
              />
            </div>
            <div className='mt-4'>
            <button onClick={()=> {setIsSignup(false);setInputSignup(LoginAndSignupInitialValue)}} type='submit' className='form-button-login'>
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
        setModal(false);
        setIsSignup(false);
        setInputLogin(LoginAndSignupInitialValue)
        setInputSignup(LoginAndSignupInitialValue)
      }
    };
  
    const handleClickOutside = (event) => {
      if (!ref.current.contains(event.target)) {
        setModal(false);
        setIsSignup(false);
        setInputLogin(LoginAndSignupInitialValue)
        setInputSignup(LoginAndSignupInitialValue)
       // console.log(ref)
        
      }
    };
  
    console.log('dsdsds')
    useEffect(() => {
      document.addEventListener("keydown", handleEsc, true);
      document.addEventListener("mousedown", handleClickOutside, true);
      document.addEventListener("touchend", handleClickOutside, true);
      return () => {
        document.removeEventListener("keydown", handleEsc, true);
        document.removeEventListener("mousedown", handleClickOutside, true);
        document.removeEventListener("touchend", handleClickOutside, true);
      };
    });
  
    
  
  

  
  
  
 
   

  return (
    <div className='h-screen'>
      <div>
      <button id="openmodal" onClick={()=> setModal(true)} className="btnGray">Login</button>
      {isSignup ? SignUpForm():LoginForm()}
      

      
      
      
      
        
        </div>
      <h2>1111111111111</h2>
      
    </div>
  );
};
export default Login;

import { useState ,useRef, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const Login = () => {

  
  
  
  const ref = useRef();
  
  const loginInitialValue = {email:"", password:""}
  const signUpInitialValue = {username:"", email:"", password:"", confirm_password:""}
  const [inputSignup, setInputSignup] = useState(signUpInitialValue)
  const [inputLogin, setInputLogin] = useState(loginInitialValue)

  const [inputValidation, setinputValidation] = useState({username: null, email: null, password: null, confirm_password: null})
  const [isEmailAvailable, setEmailAvailable] = useState(null)
  const [isLoading, setIsLoading] = useState({isEmailAvailable:false})
  
  const [isSignup, setIsSignup] = useState(false);
  const [isModalOpen, setModal] = useState(false);

  console.count("count")
  
  const form_input = `bg-zinc-700 focus:bg-neutral-900 mt-2 rounded pl-2`

  
  

  
  //<-------------------------Regex Section ----------------------------------->
    const username_pattern = new RegExp(".{8,}")
    const email_pattern = new RegExp("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" )
    const password_pattern = new RegExp(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/)
    
  //<-------------------------Regex Section ----------------------------------->  

//<-------------------------Start Login Section ----------------------------------->

  const LoginForm = () => {
        
    return (
    <div id="loginModal" className="modal" style={isModalOpen === true ? {display: "block"}:{display: "none"}}>
      <div ref={ref} className="modal-content-login ">
        <div id="header" className='text-center'>
        <span className='text-2xl font-bold'>Login<span className="close rounded-lg" onClick={handleCloseLoginForm}>&times;</span></span>
        
        <hr className='mt-4 border-2'/>
        </div>
        
        <div className=''>
        <form onSubmit={handleLoginSubmit} className='form'>
          <div className='form-col'>
            <label htmlFor='email' className='form-label'>
              Email
            </label>
            <input
              type='email'
              id='email'
              className={form_input}
              
              value={inputLogin.email}
              onChange={(e) => setInputLogin({...inputLogin,email:e.target.value})}
              required
            />
          </div>
          <div className='form-col'>
            <label htmlFor='password' className='form-label'>
              Password
            </label>
            <input
              type='password'
              className={form_input}
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
          <button type="button" onClick={()=> {setIsSignup(true);setInputLogin(loginInitialValue);}} className='ml-4 form-button-signup'>
          <p>Sign up</p>
          </button>
          </div>
          
      </form>
        </div>
      </div>
  </div>
  )}

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
  }

    

  const handleCloseLoginForm = () => {
    setModal(false);
    setIsSignup(false);
    setInputLogin(loginInitialValue);
    setInputSignup(signUpInitialValue);
    setinputValidation({username: null, email: null, password: null, confirm_password: null})
    setEmailAvailable(null)
  }

//<-------------------------End Login Section ----------------------------------->


//<-------------------------Start Signup Section ----------------------------------->

  const handleSignupSubmit = async (e) => {


    !username_pattern.test(inputSignup.username) ? setinputValidation((prev)=>({...prev,username: false})) : setinputValidation((prev)=>({...prev,username: true}))
    
    !password_pattern.test(inputSignup.password) ? setinputValidation((prev)=>({...prev,password: false})) : setinputValidation((prev)=>({...prev,password: true}))
    
    inputSignup.password !== inputSignup.confirm_password ? setinputValidation((prev)=>({...prev,confirm_password: false})) : setinputValidation((prev)=>({...prev,confirm_password: true}))

    const isAllinputValidationTrue = Object.values(inputValidation).every(value => value === true);

    if (isAllinputValidationTrue && isEmailAvailable === true && isLoading.isEmailAvailable === false) {
      try {
        await axios.post('http://localhost:8800/todo_items/signup',
          [inputSignup]
        );
        
        alert("Sign up Successfully.")
      } catch (error) {
        alert("Something went wrong!")
        console.log(error)
      }
    } else {
      e.preventDefault()
    }
    
   

    
    
    

    e.preventDefault();
    
  }
  


  
  
  
  ///////
  
  
  // Email availability effect with debounce
  useEffect(() => {
    setIsLoading((prev)=> ({...prev, isEmailAvailable: true}))
    const debounceTimer = setTimeout(async () => {
      
      if (inputSignup.email.length > 0) {
        
        try {
          const response = await axios.post(
            'http://localhost:8800/is-email-available',
            [inputSignup.email]
          );
          console.log(response)
          if (response.data.emailValidation) {
            setinputValidation((prev) => ({...prev, email: true}))
            setIsLoading((prev) => ({...prev, isEmailAvailable: false}))
          } else {
            setinputValidation((prev) => ({...prev, email: false}))
            setIsLoading((prev) => ({...prev, isEmailAvailable: false}))
          }
          setEmailAvailable(response.data.isEmailAvailable)
        } catch (error) {
          console.log(error)
        } 
      }
    }, 1000);
  
    return () => clearTimeout(debounceTimer);
  }, [inputSignup.email]);
  /////////
  
  

    const handleCloseSignUpForm = () => {
      setModal(false);
      setIsSignup(false);
      setInputLogin(loginInitialValue);
      setInputSignup(signUpInitialValue);
      setinputValidation({username: null, email: null, password: null, confirm_password: null})
      setEmailAvailable(null)
    }
    
    
    const SignUpForm = () => {

      


      return (
      <div id="signupModal" className="modal" style={isModalOpen === true ? {display: "block"}:{display: "none"}}>
        <div ref={ref} className="modal-content-signup ">
          <div id="header" className='text-center'>
          <span className='text-2xl font-bold'>Sign up<span className="close rounded-lg" onClick={handleCloseSignUpForm}>&times;</span></span>
          
          <hr className='mt-4 border-2'/>
          </div>
          
          <div className=''>
          <form onSubmit={handleSignupSubmit} className='form w-full'>
            <div className='form-col'>
              <label htmlFor='username' className='form-label'>
                Username
              </label>
              <input
                type='text'
                id='username'
                className={`${form_input} ${inputValidation.username === false ? "border-2 border-rose-500 outline-none" : ""}` }
                value={inputSignup.username}
                onChange={(e) => setInputSignup({...inputSignup,username:e.target.value})}
                required
                maxLength={30}
                
              />
              <p className='text-rose-500' style={inputValidation.username === false? {display: "block"}:{display: "none"}} >Username must contains 8 or more characters !</p>
            </div>
            <div className='form-col'>
              <label htmlFor='email' className='form-label'>
                Email
              </label>
              <input
                type='email'
                id='email'
                className=
                {`${form_input} ${inputValidation.email === false || isEmailAvailable === false ? "border-2 border-rose-500 outline-none" : ""} ${isEmailAvailable === true ? "border-2 border-green-500 outline-none": ""} 
                `}
                maxLength={30}
                value={inputSignup.email}
                onChange={(e) => setInputSignup({...inputSignup,email:e.target.value})}
                required
              />
              <p className='text-rose-500' style={!inputValidation.email && inputValidation.email !== null ? {display: "block"}:{display: "none"}} >Please match the requested format! Example: a@gmail.com </p>
              <p className='text-green-500' style={isEmailAvailable ?  {display: "block"}:{display: "none"}} > You can use this Email. </p>
              <p className='text-rose-500' style={!isEmailAvailable && isEmailAvailable !== null ? {display: "block"}:{display: "none"}} > Email is not available! Please choose a different Email. </p>
              
            </div>
            <div className='form-col'>
              <label htmlFor='password' className='form-label'>
                Password
              </label>
              <input
                type='password'
                className={`${form_input} ${inputValidation.password === false ? "border-2 border-rose-500 outline-none" : ""}` }
                id='password'
                value={inputSignup.password}
                onChange={(e) => setInputSignup({...inputSignup,password:e.target.value})}
                required
                maxLength={30}
                
                // title="Password must contain 8 or more characters that are of at least one number, and one uppercase and lowercase letter"
              />
              <p className='text-rose-500' style={inputValidation.password === false ? {display: "block"}:{display: "none"}} >Password must contain 8 or more characters that are of at least one number, and one uppercase and lowercase letter</p>
           
            </div>
            <div className='form-col'>
              <label htmlFor='confirm_password' className='form-label'>
                Confirm Password
              </label>
              <input
                type='password'
                className={`${form_input} ${inputValidation.confirm_password === false ? "border-2 border-rose-500 outline-none" : ""}` }
                id='confirm_password'
                value={inputSignup.confirm_password}
                onChange={(e) => setInputSignup({...inputSignup,confirm_password:e.target.value})}
                required
                maxLength={30}
              />

              <p className='text-rose-500 form-input-validation' style={inputValidation.confirm_password === false ? {display: "block"}:{display: "none"}} >Password and Confirm Password does not match!</p>
            
            </div>
            <div className='mt-2'>
            <button onClick={()=> {setIsSignup(false);setInputSignup(signUpInitialValue);setinputValidation({username: null, email: null, password: null, confirm_password: null});setEmailAvailable(null) }} type='submit' className='form-button-login'>
              <p>Back to Login</p>
            </button>
            <button type='submit' className='ml-4 form-button-signup' >
            <p>Sign up</p>
            </button>
            </div>
            
        </form>
          </div>
        </div>
    </div>
    )}
  
//<-------------------------End Signup Section ----------------------------------->

//<------------------------- Start Handle Click Outside Section -----------------------------------> 

    const handleEsc = (event) => {
    
      if (event.key === "Escape") {
        
        document.getElementById("openmodal").blur();
        setModal(false);
        setIsSignup(false);
        setInputLogin(loginInitialValue)
        setInputSignup(signUpInitialValue)
        setinputValidation({username: null, email: null, password: null, confirm_password: null})
        setEmailAvailable(null)
        
      }
  };
    const handleClickOutside = (event) => {
      
      if (!ref.current.contains(event.target)) {
        setModal(false);
        setIsSignup(false);
        setInputLogin(loginInitialValue)
        setInputSignup(signUpInitialValue)
        setinputValidation({username: null, email: null, password: null, confirm_password: null})
        setEmailAvailable(null)
        
        
      }
  };
    

    useEffect(() => {
      
      
      if (isModalOpen) {
          document.addEventListener("keydown", handleEsc, true);
          document.addEventListener("mousedown", handleClickOutside, true);
          document.addEventListener("touchend", handleClickOutside, true);
      }
      
      
      
      return () => {
        
        document.removeEventListener("keydown", handleEsc, true);
        document.removeEventListener("mousedown", handleClickOutside, true);
        document.removeEventListener("touchend", handleClickOutside, true);
      };
    },[isModalOpen]);

//<------------------------- End Handle Click Outside Section  -----------------------------------> 

  return (
    <div className='h-screen'>
      <div>
      <button id="openmodal" onClick={()=> setModal(true)} className="btnGray">Login</button>
      {isSignup ? SignUpForm():LoginForm()}
      
        </div>

        
      
      
    </div>
  );
};
export default Login;

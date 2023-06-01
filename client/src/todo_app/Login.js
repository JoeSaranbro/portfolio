import { useState ,useRef, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';


//<-------------------------Start Signup Section ----------------------------------->
const SignUpForm = ( { refModal, isModalOpen,setModal ,setIsSignup, isSignup} ) => {
  

  const [inputValidation, setinputValidation] = useState({username: null, email: null, password: null, confirm_password: null})
  const signUpInitialValue = {username:"", email:"", password:"", confirm_password:""}
  const [inputSignup, setInputSignup] = useState(signUpInitialValue)
  const [isEmailAvailable, setEmailAvailable] = useState(null)
  const [isLoading, setIsLoading] = useState({isEmailAvailable:false})

  
  
  // Check Email available with debounce
  useEffect(() => {
    setIsLoading((prev)=> ({...prev, isEmailAvailable: true}))
    const debounceTimer = setTimeout(async () => {
      
      if (inputSignup.email.length > 0) {
        
        try {
          const response = await axios.post(
            'http://localhost:8800/is-email-available',
            [inputSignup.email]
          );
          
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

  

//<-------------------------Regex Section ----------------------------------->
const username_pattern = new RegExp("^[a-zA-Z0-9_]{8,20}$")
    
const password_pattern = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,20}$/)

//<-------------------------Regex Section ----------------------------------->  


  const handleSignupSubmit = async (e) => {
    e.preventDefault()


    username_pattern.test(inputSignup.username) ? setinputValidation((prev)=>({...prev,username: true})) : setinputValidation((prev)=>({...prev,username: false}))
    
    password_pattern.test(inputSignup.password) ? setinputValidation((prev)=>({...prev,password: true})) : setinputValidation((prev)=>({...prev,password: false}))
    
    inputSignup.password !== inputSignup.confirm_password ? setinputValidation((prev)=>({...prev,confirm_password: false})) : setinputValidation((prev)=>({...prev,confirm_password: true}))

    if ( (username_pattern.test(inputSignup.username)&& password_pattern.test(inputSignup.password)) && isEmailAvailable === true && isLoading.isEmailAvailable === false) {
      
      try {
        e.preventDefault()
        const res = await axios.post('http://localhost:8800/todo_app/signup',
          inputSignup
        );

        

        if (res.data.signupSuccessfully) {
          alert("Signup Successfully.")
        } else {
          alert("Signup not Success!")
        }
        handleCloseSignUpForm()
      } catch (error) {
        alert("Something went wrong!")
        console.log(error)
      }
    } else {
      alert("Please match the requested format!")
      e.preventDefault()
    }
    
  }
  


  
  
  
  ///////
  
    const handleCloseSignUpForm = () => {
      setModal(false);
      setIsSignup(false);
      setInputSignup(signUpInitialValue);
      setinputValidation({username: null, email: null, password: null, confirm_password: null})
      setEmailAvailable(null)
    }


    return (
    <div id="signupModal" className="modal" style={isModalOpen && isSignup ? {display: "block"}:{display: "none"}}>
      <div ref={refModal} className="modal-content-signup ">
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
              className={`form-input ${inputValidation.username === false ? "border-2 border-rose-500 outline-none" : ""}` }
              value={inputSignup.username}
              onChange={(e) => setInputSignup({...inputSignup,username:e.target.value})}
              required
              maxLength={20}
              
            />
            <p className='text-rose-500' style={inputValidation.username === false? {display: "block"}:{display: "none"}} >Username must be between 8 and 20 characters long!</p>
          </div>
          <div className='form-col'>
            <label htmlFor='email' className='form-label'>
              Email
            </label>
            <input
              type='email'
              id='email'
              className=
              {`form-input ${inputValidation.email === false || isEmailAvailable === false ? "border-2 border-rose-500 outline-none" : ""} ${isEmailAvailable === true ? "border-2 border-green-500 outline-none": ""} 
              `}
              maxLength={20}
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
              className={`form-input ${inputValidation.password === false ? "border-2 border-rose-500 outline-none" : ""}` }
              id='password'
              value={inputSignup.password}
              onChange={(e) => setInputSignup({...inputSignup,password:e.target.value})}
              required
              maxLength={20}
              
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
              className={`form-input ${inputValidation.confirm_password === false ? "border-2 border-rose-500 outline-none" : ""}` }
              id='confirm_password'
              value={inputSignup.confirm_password}
              onChange={(e) => setInputSignup({...inputSignup,confirm_password:e.target.value})}
              required
              maxLength={30}
            />

            <p className='text-rose-500 form-input-validation' style={inputValidation.confirm_password === false ? {display: "block"}:{display: "none"}} >Password and Confirm Password does not match!</p>
          
          </div>
          <div className='mt-2'>
          <button onClick={()=> {setIsSignup(false);setEmailAvailable(null)}} type="reset" className='form-button-login'>
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

//<-------------------------Start Login Section ----------------------------------->
  const LoginForm = ({ refModal, isModalOpen, setModal, setIsSignup }) => {

    const navigate = useNavigate();
    const loginInitialValue = {email:"", password:""}
    const [inputLogin, setInputLogin] = useState(loginInitialValue)

    
    
    //<-------------------------Start Login Section ----------------------------------->

  

  const handleLoginSubmit = async (e) => {

    e.preventDefault();

    try {
      e.preventDefault()
      const res = await axios.post('http://localhost:8800/todo_app/login',inputLogin, {withCredentials: true}
      );

      
      console.log("res.data",res.data)
      alert(res.data.msg)

      if (res.data.url) {
        return navigate(res.data.url)
      }
     
      

      // if (res.data.signupSuccessfully) {
      //   alert("Signup Successfully.")
      // } else {
      //   alert("Signup not Success!")
      // }
      // handleCloseSignUpForm()
    } catch (error) {
      alert("Try Catch Error")
      console.log(error)
    }

  }

    

  const handleCloseLoginForm = () => {
    setModal(false);
    setIsSignup(false);
    
    
   
  }

  

  
  
//<-------------------------End Login Section ----------------------------------->


    return (
    <div id="loginModal" className="modal" style={isModalOpen === true ? {display: "block"}:{display: "none"}}>
      <div ref={refModal} className="modal-content-login ">
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
              className="form-input"
              
              
              onChange={(e) => setInputLogin((prev)=>({...prev,email:e.target.value}))}
              required
            />
          </div>
          <div className='form-col'>
            <label htmlFor='password' className='form-label'>
              Password
            </label>
            <input
              type='password'
              className="form-input"
              id='password'
              
              onChange={(e) => setInputLogin((prev)=>({...prev,password:e.target.value}))}
              required
            />
            <div className="mt-2 text-base text-blue-600 hover:text-blue-800 hover:underline"><Link to="/portfolio">Forgot Password?</Link></div>
          </div>
          <div className='mt-4'>
          <button type='submit' className='form-button-login'>
            <p>Login</p>
          </button>
          <button type="reset" onClick={()=> {setIsSignup(true)}} className='ml-4 form-button-signup'>
          <p>Sign up</p>
          </button>
          </div>
          
      </form>
        </div>
      </div>
  </div>
  )}


const Login = () => {

      
  const refModal = useRef();
  
  
  const [isSignup, setIsSignup] = useState(false);
  const [isModalOpen, setModal] = useState(false);
  
  console.count("Login count")
  
     
//<------------------------- Start Handle Click Outside Section -----------------------------------> 

    const handleEsc = (event) => {
    
      if (event.key === "Escape") {
        document.getElementById("openmodal").blur();
        setModal(false);
        setIsSignup(false);
        
      }
  };
    const handleClickOutside = (event) => {
      
      if (!refModal.current.contains(event.target)) {
        setModal(false);
        setIsSignup(false);
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


const testRedirect = async() => {

  const token = document.cookie.replace(/(?:(?:^|.*;\s*)auth_token\s*=\s*([^;]*).*$)|^.*$/, "$1");
  const cookieValue = document.cookie.split('; ').find((row) => row.startsWith('11='))?.split('=')[1]
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': token
  }

try {
  const res = await axios.get('http://localhost:8800/todo_app/email_verification')
  console.log(res)
} catch (error) {
  console.log(error)
}
}

const navigate = useNavigate();

const email_verification = () => {
  navigate("/Email_Verification_Page")
}



  return (
    <div className='h-screen'>
      <div>
      <button id="openmodal" onClick={()=> setModal(true)} className="btnGray">Login</button>
      
      {(isModalOpen && !isSignup)&& ( <LoginForm refModal={refModal} isModalOpen={isModalOpen} setModal={setModal}  
      setIsSignup={setIsSignup} /> )}
      
      {isModalOpen && isSignup && ( <SignUpForm refModal={refModal} isModalOpen={isModalOpen} 
      setIsSignup={setIsSignup} setModal={setModal} isSignup={isSignup} /> )
      }
      
     
        </div>
        
      <div>
        <button onClick={testRedirect} className="btnGray">
        redirect
        </button>
      </div>

      <div>
      <button onClick={email_verification} className="btnGray">
        email_verification
        </button>
      </div>

      
      
      
      
    </div>
  );
};
export default Login;

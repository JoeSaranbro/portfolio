import { useState ,useRef, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ( {setUser} ) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isModalOpen, setModal] = useState(false);
  const navigate = useNavigate()

    const ref = useRef();
  
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        document.getElementById("openmodal").blur();
        setModal(false);
      }
    };
  
    const handleClickOutside = (event) => {
      if (!ref.current.contains(event.target)) {
        setModal(false);
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
  
    
  
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(!name);
    if(!name || !email) return;
    setUser({name: name, email: email});
    navigate('/dashboard')
  };
  
  const handleLogin = () =>{
  }
 
   

  return (
    <div className='h-screen '>
      <div>
      <button id="openmodal" onClick={()=> {setModal(true)}} className="btnGray">Login</button>
        <div id="myModal" className="modal" style={isModalOpen === true ? {display: "block"}:{display: "none"}}>
          <div ref={ref} className="modal-content ">
            <div id="header" className='text-center'>
            <span className='text-2xl'>Login to Website</span>
            <span className="close rounded-lg" onClick={(e)=> {setModal(false)}}>&times;</span>
            </div>
            
            <div>
            <form className='form' onSubmit={handleSubmit}>
              <div className='form-row'>
                <label htmlFor='name' className='form-label'>
                  name
                </label>
                <input
                  type='text'
                  className='form-input'
                  id='name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className='form-row'>
                <label htmlFor='email' className='form-label'>
                  email
                </label>
                <input
                  type='email'
                  className='form-input'
                  id='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <button type='submit' className='btn btn-block'>
                login
              </button>
           </form>
            </div>
          </div>
        </div>
        </div>
      <h2>1111111111111</h2>
    </div>
  );
};
export default Login;

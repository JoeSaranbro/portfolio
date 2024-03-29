import React from 'react'
import { useState, useEffect, useRef} from 'react'
import axios from 'axios'

import { IoMdAddCircleOutline } from "react-icons/io"
import { GiNotebook } from "react-icons/gi"
import { BsThreeDots } from "react-icons/bs"
import { CgProfile } from "react-icons/cg"

import { useNavigate } from 'react-router-dom';
import Add from "./Add"
import Edit from "./Edit"
import { Link } from 'react-router-dom'

import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { fetchTodo } from '../features/todo/todoSlice'
import { removeTodo } from '../features/todo/todoSlice'




const Todo_items = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch()

  const [username, setUsername] = useState("")
  const [data, setData] = useState([]);

  const [isEditing, setEditing] = useState(false)
  const [currentTodo, setCurrentTodo] = useState(null)
  const [currentThreeDots, setCurrentThreeDots] = useState(null)

  const [threeDotsModal, setThreeDotsModal] = useState(false);
  const threeDotsRef = useRef([]);

  const [profileButton, setProfileButton] = useState(false);
  

  
  
  
  

  const [isAddModalOpen, setAddModal] = useState(false);
  const addRef = useRef();
  const [isLoading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  

  const csrf = localStorage.getItem('csrfToken');
  const customHeaders = {
    'x-csrf-token': csrf,
    
  };


  const config = {
    headers: customHeaders,
    withCredentials: true, // Set withCredentials to true
  };


  
  
  useEffect(() => {
           
    const authentication = async () => {
      try {
        console.count("rendered")
        const res = await axios.get(`${process.env.REACT_APP_backend_URL}/authentication`, config)
        if (res.data.csrf) {
          localStorage.setItem("csrfToken", res.data.csrf)
        }
        const data = {user_name: res.data.user_name, todos:res.data.data}
        //console.log("res.data", res.data)
        dispatch(fetchTodo(data))

        
        if (res.data.user_name) {
          setUsername(res.data.user_name)
        }
          //if there is no todo item.
          
          if(Array.isArray(res.data.data) && res.data.data.length === 0){
            setError("There is no todo item.")
          } 
          //if there are items
          else  {
            setData(res.data.data)
          } 
          
      } catch (err) {
        if (err.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          if (err.response.status === 401) {
            // handle unauthorized error
            alert("You're not authenticated!")
            navigate("/login")
          } else {
            //console.log("bad request")
            setError(err.code)
          }
        } else if (err.request) {
          // The request was made but no response was received
          // handle network error
          console.log('Network Error', err.message);
          setError(err.message)
        } else {
          // Something happened in setting up the request that triggered an Error
          setError(err.code)
          console.log('Error', err);
        }
      }
  }
  authentication()
  
  },[])

  

  

  
  
  
  const handleThreedots = (index) => {
    
    setCurrentThreeDots((prev)=>({...prev, "index" : index}))
    if (threeDotsModal && index === currentThreeDots.index ) {
      setThreeDotsModal(false)
      
    } 
    else {
      setThreeDotsModal((prev)=> !prev)
      
    }
  }
  

 
  
  
 
  const handleClickOutside = (event) => {
    if (threeDotsModal && !threeDotsRef.current[currentThreeDots.index].contains(event.target)) {
      setThreeDotsModal(false);

    }
   else if (isAddModalOpen && !addRef.current.contains(event.target)) {
        setAddModal(false);
        
    }
    
  };

  

  const handleEsc = (event) => {
    
    if (event.key === "Escape") {
      setAddModal(false);
      
    }
};
  
  useEffect(() => {
    
    if (threeDotsModal || isAddModalOpen) {
      document.addEventListener("click", handleClickOutside, true);
      document.addEventListener("touchend", handleClickOutside, true);
      document.addEventListener("keydown", handleEsc, true);
    }
    
    
    
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
      document.removeEventListener("touchend", handleClickOutside, true);
      document.removeEventListener("keydown", handleEsc, true);
      
      
    };
    
  },[threeDotsModal,isAddModalOpen]);
  
 
  // Delete section
  const handleClickDelete = async (todo_id) => {
    
   
    try {
      await axios.delete(`${process.env.REACT_APP_backend_URL}/todo_app/delete_todo/`+ todo_id, config)
      
      
      dispatch(removeTodo(todo_id))
      const updatedData = data.filter(item => item.todo_id !== todo_id);
      setData(updatedData);
      alert("Deleted Successfully!")
      
      
      setThreeDotsModal(false)
      setEditing(false)
      

    } catch (err) {
      console.log("try catch delete error",err)
      alert(err.response.data.msg)
      setEditing(false)
    }
        
  }
  

  //console.log("selector_todos, state",selector_todos)

  
 

  const logout = async() => {
    
    try {
      const res = await axios.get(`${process.env.REACT_APP_backend_URL}/todo_app/logout`, config)
      alert(res.data)
      navigate("/login")
    } catch (error) {
      alert("error")
      console.log("logout error",error)
    }
    
  }




  



  return (
    <div className='content'>
      <div className='flex text-4xl bg-black leading-relaxed font-bold relative'>Welcome, {username} 
        {/* <div className='absolute right-0 pr-2'> 
          <button onClick={()=> logout()} className='bg-slate-700 hover:bg-slate-700 px-4 rounded py-1'>
            <p className='text-3xl'>Logout</p>
          </button>
        </div> */}
        

        <div className="absolute right-0 px-2 py-2"  onClick={()=> setProfileButton((prev)=> !prev)} >
           <CgProfile size={48} className='h-full hover:bg-zinc-800 cursor-pointer'/>
          
          <div className ="hidden absolute -left-36 bg-zinc-900 text-xl rounded-lg" style={(profileButton) ?  {display:"block"}:{}} >
            <ul className="w-44">
            <Link to="/editprofile"> <li className="pt-2 pl-2 hover:bg-slate-700 cursor-pointer rounded-lg" >Edit Profile</li></Link>
            <li className="pt-2 pl-2 hover:bg-slate-700 cursor-pointer rounded-lg" onClick={()=> logout()} > Logout</li>
            </ul>
          </div>
        </div>

      </div>
      <div className='flex mt-1'>
        
      <div className="todolist-sidebar w-full max-w-[18rem] bg-[#555353] bg-opacity-25 mr-2">
        
        <div className="addTodo flex justify-center">
          <button className=' bg-sky-500 hover:bg-sky-700 rounded mt-2' onClick={()=> setAddModal(true)}>
            <p className='font-bold text-xl py-2 px-4 flex'>New Todo <span className='pl-2'><IoMdAddCircleOutline className='' size={30} /></span></p> 
            </button> 
        </div>
        <div className="todo_items mt-3">
          {isLoading ? 
            <div className='loading-spinner flex justify-center'>
              <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 border-black border-t-blue-600 rounded-full" role="status">
              </div>
            </div>
          : null } 
          {data.length > 0 ? 
          <div className="items " >
            {data.map((todo , index)=> (
              
              <div  className="flex flex-row bg-neutral-700 bg-opacity-50 mt-4 group hover:bg-neutral-600"   style={{cursor: "pointer"}} key={todo.todo_id}>
                
                <div className='basis-1/12 pt-1' onClick={()=> [setCurrentTodo(todo),setEditing(true)]} ><GiNotebook size={30} /> </div>
                <div className="item-title-sidebar basis-10/12 " onClick={()=>  [setCurrentTodo(todo),setEditing(true)]} >
                <p className='pl-2 break-all'>{todo.title}</p>
                </div>
                <div className="relative basis-1/12 my-2 pl-0.5 invisible group-hover:visible hover:hover:bg-neutral-400 rounded-md" 
                 
                style={(threeDotsModal) && (index === currentThreeDots.index) ? {visibility:"visible"}:{} }
                
                
                ref={(el)=>threeDotsRef.current[index] = el}  
                >
                <BsThreeDots size={20} onClick={()=>[handleThreedots(index)]}/>
                <div className ="threedotsmodal hidden absolute w-32 -left-28 bg-stone-900" style={(threeDotsModal) && (index === currentThreeDots.index) ?  {display:"block"}:{}} >
                  <ul className="ThreeDotsDropdown">
                  <li className="" onClick={()=> [handleClickDelete(todo.todo_id)]}>Delete</li>
                  </ul>
                </div>
                  
                </div>
                

              </div>
              
            ))}
          </div> 
          : <div className='break-all'>{error}</div>}
          
        </div>
      </div>
      <div className="todolist-content flex w-full">
        
        
          {isEditing &&
            (
            <Edit key={currentTodo.todo_id} currentTodo={currentTodo}  data={data}  setData={setData} setEditing={setEditing}  />
            )
            
          
          }
          
        
      </div>
      
      {isAddModalOpen? <Add setData={setData} isAddModalOpen={isAddModalOpen} setAddModal={setAddModal} addRef={addRef}  setError={setError} /> : null}
      
      
    </div> 
    
    </div>
  )
}

export default Todo_items
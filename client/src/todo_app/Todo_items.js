import React from 'react'
import { useState, useEffect, useRef} from 'react'
import axios from 'axios'
import { IconContext } from "react-icons";
import { IoMdAddCircleOutline } from "react-icons/io"
import { GiNotebook } from "react-icons/gi"
import { BsThreeDots } from "react-icons/bs"
import useAxios from './useAxios';




const Todo_items = () => {
  const [isSelectedDetails, setSelectedDetails] = useState(null);
  const [isSelectedTitle, setSelectedTitle] = useState(null);
  const [todoItems, setTodoItems] = useState(null);
  const [editTitleModal, setIsETMOpen] = useState(false);
  const threeDotsRef = useRef([]);

  const initialTodoInput = {title: "", details: ""}
  const [userInput , setUserInput] = useState({title: "", details: ""})
  const [isAddModalOpen, setAddModal] = useState(false);
  const addRef = useRef();

  
 
  const { data, isLoading, error, setError } = useAxios("http://localhost:8800/todo_items")

 
  useEffect(()=> {
  if (data !== null) {
    if(data.length !== 0){
      setTodoItems(data)
    } else if (data.length === 0) {
      setError("There has no todo item.")
      //There has no todo item.
    }
  }
  
  
  },[ data, error ])
  
  
 
  





const handleSelected = (id) => {
 const showData = todoItems.find((k)=> k.id === id);
 setSelectedDetails(showData);
 
}




const SelectTodoId = () => {
  
    let id = null;
    let title = null;
    let details = null;

  if (isSelectedDetails === null) {
    return null;
  } else {
     id = isSelectedDetails.id
     title = isSelectedDetails.title;
     details = isSelectedDetails.details;
     
    return(
      <div className="item" key={id}>
          <div className="item-title">
          <p>{title}</p>
          </div>
          <div className="item-details">
          <p>{details}</p>
          </div>
  
      </div>
    )
  }
 
  
}


  const handleThreedots = (index) => {
    setSelectedTitle(index);
    if (editTitleModal && (index === (isSelectedTitle)) ) {
      setIsETMOpen(false)
    } else {
      setIsETMOpen(true)
    }
  }
  
  const closeAddModal = () => {
      setAddModal(false);
      setUserInput(initialTodoInput)
  }

  const handleClickOutside = (event) => {
    if (editTitleModal) {
      if (!threeDotsRef.current[isSelectedTitle].contains(event.target)) {
        setIsETMOpen(false);
        
      }
    } else if (isAddModalOpen) {
      if (!addRef.current.contains(event.target)) {
        setAddModal(false);
        setUserInput(initialTodoInput)
      }
    }
    
  };

  const handleEsc = (event) => {
    
    if (event.key === "Escape") {
      setAddModal(false);
      setUserInput(initialTodoInput)
    }
};
  
  useEffect(() => {
    
    
    document.addEventListener("click", handleClickOutside, true);
    document.addEventListener("touchend", handleClickOutside, true);
    document.addEventListener("keydown", handleEsc, true);
    
    
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
      document.removeEventListener("touchend", handleClickOutside, true);
      document.removeEventListener("keydown", handleEsc, true);
      
      
    };
    
  },[editTitleModal,isAddModalOpen]);

  const handleInputOnchange = (e) => {
    setUserInput((prev)=> ({...prev , [e.target.name]: e.target.value}))
    
    
  }

  const handleClickAdd = async (e) => {

    e.preventDefault();
    try {
      await axios.post("http://localhost:8800/add", userInput);
      setAddModal(false);
      setUserInput(initialTodoInput)

    } catch (err) {
      console.log(err);
      setError(true)
      setAddModal(false);
      setUserInput(initialTodoInput)
    }

    console.log(userInput)
  }
 

  
  const AddForm = () => {
    return (
    <div id="signupModal" className="modal" style={isAddModalOpen === true ? {display: "block"}:{display: "none"}}>
      <div ref={addRef} className="h-full max-h-[39rem] w-10/12 max-w-[34rem] absolute left-1/2 -translate-x-1/2 bg-zinc-900 rounded-lg m-auto p-3">
        <div id="header" className='text-center'>
        <span className='text-2xl font-bold'>New Todo<span className="close rounded-lg" onClick={closeAddModal} >&times;</span></span>
        
        <hr className='mt-4 border-2'/>
        </div>
        
        <div className=' '>
        <form className='form'>
          <div className=' '>
          <div className='form-col border-2 border-white focus-within:border-blue-600 rounded-lg mt-2 px-2 py-1.5 h-full'>
            <label htmlFor='todoname' className='form-label'>
              Todo Name
            </label>
            <input
              type='text'
              id='todoname'
              className='form-input'
              name="title"
              maxLength="20"
             // value={userInput.title}
              onChange={handleInputOnchange}
              required
            />
          </div>
          <div className="h-[26rem]">
            <div className="flex flex-col border-2 border-white focus-within:border-blue-600 rounded-lg mt-2 px-2 py-1.5 h-full">
              <label htmlFor="firstName" className="text-white text-md font-bold">Details</label>
              <textarea  
              id="TodoDetails"
              type="text"
              name="details"
             // value={userInput.details}
              onChange={handleInputOnchange}
              maxLength="500"
              className="form-input h-full"></textarea>
            </div>
          </div>
          <div className="flex">
             <div className="w-1/2 my-auto text-xl font-bold"><p className={Object.keys(userInput.details).length === 500 ? "text-red-700":""}>{Object.keys(userInput.details).length}/500</p>
             </div> 
              <div className="flex justify-end pt-2 w-1/2">
                  <button type='button' className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-blue-300 w-26 font-medium rounded-lg text-l px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800" onClick={closeAddModal}><p>Cancle</p></button>
                  <button onClick={handleClickAdd}  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 w-26 font-medium rounded-lg text-l px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"><p>Add</p></button>
              </div>
          </div>
        </div>
      </form>
        </div>
      </div>
  </div>
  )}

  

// style={isHovering ? {visibility:"visible"}:{visibility:"hidden"} }

  return (
      <div className='content flex w-screen'>
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
          {todoItems ? 
          <div className="items ">
            {todoItems.map((todo , index)=> (
              
              <div  className="flex flex-row bg-neutral-700 bg-opacity-50 mt-4 group hover:bg-neutral-600"  style={{cursor: "pointer"}} key={todo.id}>
                <div className='basis-1/12 pt-1' onClick={()=> {handleSelected(todo.id)}} ><GiNotebook size={30} /> </div>
                <div className=" item-title basis-10/12 " onClick={()=> {handleSelected(todo.id)}} >
                <p className='pl-2 break-all'>{todo.title}</p>
                </div>
                <div className="relative basis-1/12 my-2 pl-0.5 invisible group-hover:visible hover:hover:bg-neutral-400 rounded-md" 
                onClick={()=>(handleThreedots(index))} 
                style={(editTitleModal) && (index === isSelectedTitle) ? {visibility:"visible"}:{} }
                ref={(element)=> threeDotsRef.current.push(element)} 
                >
                <BsThreeDots size={20}/>
                <div className ="ETM hidden absolute w-32 -left-28 bg-stone-900" style={(editTitleModal) && (index === isSelectedTitle) ?  {display:"block"}:{}} >
                  <ul className="ThreeDotsDropdown">
                  <li className="">Rename</li>
                  <li className="">Delete</li>
                  </ul>
                </div>
                  
                </div>
                

              </div>
              
            ))}
          </div> 
          : <div className='break-all'>{error}</div>}
          
        </div>
      </div>
      <div className="todolist-content w-full">
        <div className='font-bold text-4xl text-red-900 border-b-2 border-white pb-4 '>TodoList</div>
        <div className="todo_items">
          {todoItems ? 
          <div className="items">
            <SelectTodoId />
            
          </div> 
          : <div> {error} </div>}
          
        </div>
      </div>
      <div></div>
      {isAddModalOpen? AddForm() : null}
      
      
    </div>  
  )
}

export default Todo_items
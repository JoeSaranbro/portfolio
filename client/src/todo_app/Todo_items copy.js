import React from 'react'
import { useState, useEffect, useRef} from 'react'
import axios from 'axios'

import { IoMdAddCircleOutline } from "react-icons/io"
import { GiNotebook } from "react-icons/gi"
import { BsThreeDots } from "react-icons/bs"
import useAxios from './useAxios';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime'
import Add from "./Add"
import Edit from "./Edit"

//./components/edit.png


const Todo_items = () => {

  
  
  const [todoItems, setTodoItems] = useState(null);

  const [isEditing, setEditing] = useState(false)
  const [currentTodo, setCurrentTodo] = useState(null)
  const [currentThreeDots, setCurrentThreeDots] = useState(null)

  const [threeDotsModal, setThreeDotsModal] = useState(false);
  const threeDotsRef = useRef([]);

  const [isAddModalOpen, setAddModal] = useState(false);
  const addRef = useRef();
  
  const { data, isLoading, error, setError} = useAxios("http://localhost:8800/todo_items")
  
  // axios.get('https://example.com/', {
  //   withCredentials: true,
  //   headers: {
  //     'X-CSRF-TOKEN': cookies['cookie-name']
  //   }
  // });
 
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
  
  //console.log(data)
  
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
  
 

  

  
  console.count("all")
  
  const handleClickDelete = async (id) => {
   // console.log(index)
    try {
      await axios.delete("http://localhost:8800/todo_items/" + id)
      const res = await axios.get("http://localhost:8800/todo_items")
      setTodoItems(res.data)
      setThreeDotsModal(false)
      setEditing(false)

      alert("Deleted Successfully!")
    } catch (error) {
      console.log(error)
      alert("Error!")
      setEditing(false)
    }
        
  }
 

  

 
  

  



  return (
    <div className='content '>
      <div className='text-6xl bg-black leading-relaxed font-bold'>Todolist App</div>
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
          {todoItems ? 
          <div className="items " >
            {todoItems.map((todo , index)=> (
              
              <div  className="flex flex-row bg-neutral-700 bg-opacity-50 mt-4 group hover:bg-neutral-600"   style={{cursor: "pointer"}} key={todo.id}>
                
                <div className='basis-1/12 pt-1' onClick={()=> [setCurrentTodo(todo),setEditing(true)]} ><GiNotebook size={30} /> </div>
                <div className=" item-title-sidebar basis-10/12 " onClick={()=>  [setCurrentTodo(todo),setEditing(true)]} >
                <p className='pl-2 break-all'>{todo.title}</p>
                </div>
                <div className="relative basis-1/12 my-2 pl-0.5 invisible group-hover:visible hover:hover:bg-neutral-400 rounded-md" 
                 
                style={(threeDotsModal) && (index === currentThreeDots.index) ? {visibility:"visible"}:{} }
                
                
                ref={(el)=>threeDotsRef.current[index] = el}  
                >
                <BsThreeDots size={20} onClick={()=>[handleThreedots(index)]}/>
                <div className ="threedotsmodal hidden absolute w-32 -left-28 bg-stone-900" style={(threeDotsModal) && (index === currentThreeDots.index) ?  {display:"block"}:{}} >
                  <ul className="ThreeDotsDropdown">
                  <li className="" onClick={()=> [handleClickDelete(todo.id)]}>Delete</li>
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
            <Edit currentTodo={currentTodo}  todoItems={todoItems}  setTodoItems={setTodoItems} setEditing={setEditing} />
            )
            
          
          }
          
        
      </div>
      
      {isAddModalOpen? <Add setTodoItems={setTodoItems} isAddModalOpen={isAddModalOpen} setAddModal={setAddModal} addRef={addRef}  /> : null}
      
      
    </div> 
    
    </div>
  )
}

export default Todo_items
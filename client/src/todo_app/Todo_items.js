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
  
  const threeDotsRef = useRef(new Array());
  
  

  
 
  const { data, isLoading, error, setError } = useAxios("http://localhost:8800/todo_items")

  
  console.log("error")
  console.log(error)
  console.log("--------------")
  console.log("data")
  console.log(data)
  useEffect(()=> {

  if (data && error === null) {
    setError("There has no todo item!")
  } else if(data !== null){
    
    setTodoItems(data)
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
  
  const handleClickOutside = (event) => {
    if (editTitleModal) {

      if (!threeDotsRef.current[isSelectedTitle].contains(event.target)) {
        setIsETMOpen(false);
        
      }
    }
    
  };
  
  useEffect(() => {
    
    
    document.addEventListener("click", handleClickOutside, true);
    document.addEventListener("touchend", handleClickOutside, true);
    
    
    
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
      document.removeEventListener("touchend", handleClickOutside, true);
      
      
    };
    
  },[editTitleModal]);




  


// style={isHovering ? {visibility:"visible"}:{visibility:"hidden"} }

  return (
      <div className='content flex w-screen'>
      <div className="todolist-sidebar w-full max-w-[18rem] bg-[#555353] bg-opacity-25 mr-2">
        
        <div className="addTodo flex justify-center">
          <button className=' bg-sky-500 hover:bg-sky-700 rounded mt-2'>
            <p className='font-bold text-xl py-2 px-4 flex'>New Todo <span className='pl-2'><IoMdAddCircleOutline className='' size={30} /></span></p> 
            </button> 
        </div>
        <div className="todo_items mt-3">
          {todoItems ? 
          <div className="items ">
            {todoItems.map((todo , index)=> (
              
              <div  className="flex flex-row bg-neutral-700 bg-opacity-50 mt-4 group hover:bg-neutral-600"  style={{cursor: "pointer"}} key={todo.id}>
                <div className='basis-1/12 pt-1' onClick={()=> {handleSelected(todo.id)}} ><GiNotebook size={30} /> </div>
                <div className=" item-title basis-10/12 " onClick={()=> {handleSelected(todo.id)}} >
                <p className='pl-2 '>{todo.title}</p>
                </div>
                <div className="relative basis-1/12 my-2 pl-0.5 invisible group-hover:visible hover:hover:bg-neutral-400 rounded-md" 
                onClick={()=>(handleThreedots(index))} 
                style={(editTitleModal) && (index === isSelectedTitle) ? {visibility:"visible"}:{} }
                ref={(element)=> threeDotsRef.current.push(element)} 
                >
                <BsThreeDots size={20}/>
                <div className ="ETM hidden absolute w-32 -left-28 bg-stone-900" style={(editTitleModal) && (index === isSelectedTitle) ?  {display:"block"}:{}} >
                  <ul className="ThreeDotsDropdown">
                  <li className="" onClick={()=> console.log("q")}>Rename</li>
                  <li className="">Delete</li>
                  </ul>
                </div>
                  
                </div>
                

              </div>
              
            ))}
          </div> 
          : <div>{error}</div>}
          
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
    </div>  
  )
}

export default Todo_items
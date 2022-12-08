import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { IconContext } from "react-icons";
import { IoMdAddCircleOutline } from "react-icons/io"
import { GiNotebook } from "react-icons/gi"
import { BsThreeDots } from "react-icons/bs"




const Todo_items = () => {
  const [isSelected, setSelected] = useState("");
  const [todoItems, setTodoItems] = useState([]);

  

 


useEffect(() => {
  const fetchAllTodoItems = async () => {
    try {
        const res = await axios.get("http://localhost:8800/todo_items")
        setTodoItems(res.data);
        
    } catch (err) {
        console.log(err)
    }
  };
  fetchAllTodoItems();
  
}, []);


const SelectTodoId = () => {
  const show = todoItems.find((k)=> k.id === isSelected)
  if (isSelected == "") {
    return null;
  } else {
    return(
      <div className="item" show={show.id}>
          <div className="item-title">
          <p>{show.title}</p>
          </div>
          <div className="item-details">
          <p>{show.details}</p>
          </div>
  
      </div>
    )
  }
  
  
}
// style={isHovering ? {visibility:"visible"}:{visibility:"hidden"} }

  return (
      <div className='content flex w-screen'>
      <div className="todolist-sidebar w-1/5 bg-[#555353] bg-opacity-25 mr-2">
        
        <div className="addTodo w-full justify-center">
          <button className=' bg-sky-500 hover:bg-sky-700 rounded ml-12 mt-2'>
            <p className='font-bold text-xl py-2 px-4 flex'>Add New Todo <span className='pl-2'><IoMdAddCircleOutline className='' size={30} /></span></p> 
            </button> 
        </div>
        <div className="todo_items mt-3">
          {todoItems ? 
          <div className="items ">
            {todoItems.map((todo)=> (
              <div className="flex flex-row bg-neutral-700 bg-opacity-50 mt-4 group hover:bg-neutral-600" key={todo.id} style={{cursor: "pointer"}}>
                <div className='basis-1/12 pt-1'><GiNotebook size={30} /> </div>
                <div className=" item-title basis-10/12 " onClick={()=> {setSelected(todo.id)}} >
                <p className='pl-2 '>{todo.title}</p>
                </div>
                <div className="basis-1/12 my-2 invisible group-hover:visible "  ><BsThreeDots size={20}/></div>
                

              </div>
              
            ))}
          </div> 
          : <div>There has no Todo Items</div>}
          
        </div>
      </div>
      <div className="todolist-content w-full">
        <div className='font-bold text-4xl text-red-900 border-b-2 border-white pb-4 '>TodoList</div>
        <div className="todo_items">
          {todoItems ? 
          <div className="items">
            <SelectTodoId />
          </div> 
          : <div>There has no Todo Items</div>}
          
        </div>
      </div>
    </div>  
  )
}

export default Todo_items
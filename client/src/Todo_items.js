import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'

const Todo_items = () => {
  
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


console.log(todoItems);

  return (
      <div className='content'>
      <div className='font-bold text-4xl text-red-900 border-b-2 border-white pb-4 '>TodoList</div>
      <div className="todo_items">
        {todoItems ? 
        <div className="items">
          {todoItems.map((todo)=> (
            <div className="item" key={todo.id}>

              <div className="item-title">
              <p>{todo.title}</p>
              </div>
              <div className="item-details">
              <p>{todo.details}</p>
              </div>

            </div>
            
          ))}
        </div> 
        : <div>There has no Todo Items</div>}
        
      </div>
    </div>  
  )
}

export default Todo_items
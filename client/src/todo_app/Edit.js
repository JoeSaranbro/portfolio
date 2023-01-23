import { useEffect, useState } from "react"

const Edit = ({ currentTodo , todoItems, setTodoItems , setEditing}) => {

  
  const [updateInfo, setUpdateInfo] = useState(currentTodo)
  

  useEffect(()=> {
    setUpdateInfo(currentTodo)

    
  },[currentTodo])

  
  const handleUpdate = (e) => {
    e.preventDefault()
    if (!updateInfo) {
      alert("Title can't be empty!")
    } else {
      for (let i = 0; i < todoItems.length; i++) {
        if (todoItems[i].id === updateInfo.id) {
          todoItems.splice(i, 1, updateInfo);
          break;
        }
      }
      
      setTodoItems(todoItems)
      setEditing(false)
      alert("Update Successfully!")
    }

    
    
  }
    
    if (currentTodo) {
        return(
          <div className="item w-full flex justify-center" key={currentTodo.id}>
            <div>
                <form>
                <div className="item-title-body">
                    {/* <p>{currentTodo.title}</p> */}
                    <input
                    value={updateInfo.title} 
                    onChange={(e)=> setUpdateInfo({...updateInfo,title: e.target.value})}
                    className="form-input" />
                    
                    
                </div>
                <div className="item-details">
                    
                    <textarea 
                    value={updateInfo.details} 
                    onChange={(e)=> setUpdateInfo({...updateInfo,details: e.target.value})}
                    className="form-input w-full h-[20rem]"
                    />
                </div>
                <div className="flex justify-end">
                  <button onClick={()=> setEditing(false)} className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 w-26 font-medium rounded-lg text-l px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800">Cancel</button>
                  <button onClick={handleUpdate} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 w-26 font-medium rounded-lg text-l px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Update</button>
                </div>
                </form>
            </div>
            
          </div>
      
          
        )
      } 
}

export default Edit
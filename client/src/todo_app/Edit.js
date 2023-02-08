import { useEffect, useState } from "react"
import axios from "axios"
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import duration from 'dayjs/plugin/duration'

dayjs.extend(duration)
dayjs.extend(relativeTime)

const Edit = ({ currentTodo , todoItems, setTodoItems , setEditing}) => {




  const [updateInfo, setUpdateInfo] = useState(currentTodo)
  
  //console.log(updateInfo.date_start.substring(0,16))

  const RemainingTime = () => {
    const [timeNow, setTimeNow] = useState(new Date())

    useEffect(()=> {
      const interval = setInterval(() => setTimeNow(new Date()), 60000);
      return () => {
        clearInterval(interval);
      };
    },[])
    
    //const timeNow = new Date()

    const start = dayjs(updateInfo.date_start);
    const end = dayjs(updateInfo.date_end)

   
    const date_time_project_duration = dayjs.duration(end.diff(start));
    const date_time_remaining = dayjs.duration(end.diff(timeNow));
    
    const date_time_project_duration_formatted = date_time_project_duration.format('D')+ " Days " +  date_time_project_duration.format('H') + " Hours "+ date_time_project_duration.format('m') +" Minutes left" ;
    const date_time_remaining_formatted = date_time_remaining.format('D')+ " Days " +  date_time_remaining.format('H') + " Hours "+ date_time_remaining.format('m') +" Minutes left";
    
    
    
    
    
    
    
    

    return(
      <div>
        <div><p className="text-xl font-bold">Todo Duration</p> { updateInfo.date_end ? date_time_project_duration_formatted: null }</div>
        <div className="mt-4"> <p className="text-xl font-bold">Remaining Time From Now:  </p> {updateInfo.date_end ? date_time_remaining_formatted :null}  </div>

        
      </div>
    )
  }
  
  useEffect(()=> {
    
   
    
    setUpdateInfo(currentTodo)
  },[currentTodo])

  
 

  
  
  const handleUpdate = async (e) => {
    
    

    
    e.preventDefault()
    if (!updateInfo.title) {
      alert("Title can't be empty!")
    } else {
      try {
        await axios.put(`http://localhost:8800/todo_items/` + currentTodo.id, {...updateInfo,date_start: updateInfo.date_start ? dayjs(updateInfo.date_start).format('YYYY-MM-DDTHH:mm') : updateInfo.date_start  , 
        date_end:  updateInfo.date_end ? dayjs(updateInfo.date_end).format('YYYY-MM-DDTHH:mm') : updateInfo.date_end });
        const res = await axios.get("http://localhost:8800/todo_items")
        
        setTodoItems(res.data)
        alert("Updated Successfully!")
      } catch (error) {
        console.log(error)
        alert("Error!")
      }
      setEditing(false)
      
    }

   
    
  }
    
    if (currentTodo) {
        return(
          <div className="item w-full flex gap-4 " key={currentTodo.id}>
            
                <form className="w-full">
                  <div className="edit-content flex w-full justify-center">
                    <div className="flex flex-col w-[340px]">
                      <div className="item-title-body">
                          <input
                          value={updateInfo.title} 
                          onChange={(e)=> setUpdateInfo({...updateInfo,title: e.target.value})}
                          className="form-input w-[340px]" 
                          maxLength="15" />
                          
                          
                      </div>
                      <div className="item-details ">
                          
                          <textarea 
                          value={updateInfo.details} 
                          onChange={(e)=> setUpdateInfo({...updateInfo,details: e.target.value})}
                          className="form-input w-full h-[20rem]"
                          maxLength="500"
                          />
                      </div>
                      <div className="flex w-full">
                        <div className="my-auto w-1/2 text-xl font-bold">
                          <p className={updateInfo.details.length == 500 ? "text-red-700":""}>{updateInfo.details.length}/500</p>
                        </div>
                        <div className="flex flex-row-reverse pt-2 w-1/2">
                          <button type="button" onClick={()=> setEditing(false)} className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 w-26 font-medium rounded-lg text-l px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800">Cancel</button>
                          <button onClick={handleUpdate} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 w-26 font-medium rounded-lg text-l px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Update</button>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-4 pt-2 ml-10 w-full flex-col mr-4 max-w-[17rem]">
                      <div className="start_date font-bold  ">
                        <p className="bg-green-700 rounded-md text-center "> Date Start</p>
                        <input 
                        type="datetime-local"
                        value={updateInfo.date_start ? dayjs(updateInfo.date_start).format('YYYY-MM-DDTHH:mm'): ""}
                       
                       
                        onChange={(e)=> setUpdateInfo({...updateInfo,date_start: e.target.value})} 
                        className="text-black mt-4 text-center  text-sm input_date:text-lg input_date:w-full"
                         />
                      </div>
                      <div className="end_date font-bold">
                        <p className="bg-red-700 rounded-md text-center"> Date End</p>
                        <input 
                        type="datetime-local" 
                       
                        value={updateInfo.date_end ? dayjs(updateInfo.date_end).format('YYYY-MM-DDTHH:mm'): ""}
                        onChange={(e)=> setUpdateInfo({...updateInfo,date_end: e.target.value})} 
                        className="text-black mt-4 text-center   text-sm input_date:text-lg input_date:w-full"
                        
                        />
                      </div>
                      {/* {dayjs(updateInfo.date_end).fromNow } {dayjs(new Date()).diff(updateInfo.date_end,"dd:hh:mm")} */ }
                      <div>
                         <RemainingTime /> 
                      </div>
                
                    </div>
                  </div>
                </form>
              
            
            
          </div>
      
          
        )
      } 
}

export default Edit
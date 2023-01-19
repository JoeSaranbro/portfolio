

const Update = ({ currentTodo }) => {
    
    if (currentTodo) {
        return(
          <div className="item w-full flex justify-center" key={currentTodo.id}>
            <div>
                <form>
                <div className="item-title-body">
                    {/* <p>{currentTodo.title}</p> */}
                    <input
                    value={currentTodo.title} 
                    className="form-input" />
                    
                    
                </div>
                <div className="item-details">
                    
                    <textarea 
                    value={currentTodo.details} 
                    className="form-input w-full h-[20rem]"
                    />
                </div>
                <div className="flex justify-end"><button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 w-26 font-medium rounded-lg text-l px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Update</button></div>
                </form>
            </div>
            
          </div>
      
          
        )
      } 
}

export default Update
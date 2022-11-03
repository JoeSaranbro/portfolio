//modal with flex
<Modal
                isOpen={editModalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                className="absolute flex top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-y-auto w-full max-w-2xl h-[38rem] min-[740px]:w-96 bg-zinc-900"
                contentLabel="Example Modal"
                >
                <form className="w-full">
                  <div className="text-white ">
                      <div className="">
                        <p className="font-bold text-2xl text-center">Edit</p>
                        <hr className="border-1 border-neutral-400 mt-3"/>
                      </div>
                      <div className="mx-3">
                        <div className="flex flex-col border-2 border-white focus-within:border-indigo-300 rounded-lg mt-2 px-2 py-1.5 ">
                          <label htmlFor="TodoName" className="text-white text-md font-bold">Todo Name</label>
                          <input 
                          id="TodoName"
                          type="text"
                          name="TodoName"
                          value={isEditing[1]}
                          onChange={(e) => setEdit(...isEditing+e.target.value)}
                          
                          className="inputTodoName"
                          //{todoList.filter((task) => task.id == currentId[1])}
                          //onChange={e => setFirstName(e.target.value)}
                          >
                          </input>
                        </div>
                      </div>
                      <div className="mx-3 h-[26rem]">
                        <div className="flex flex-col border-2 border-white focus-within:border-indigo-300 rounded-lg mt-2 px-2 py-1.5 h-full">
                          <label htmlFor="firstName" className="text-white text-md font-bold">Details</label>
                          <textarea  
                          id="TodoDetails"
                          type="text"
                          name="TodoDetails"
                          
                          onChange={(e) => e.target.value}
                          className="inputTodoDetails h-full"></textarea>
                        </div>
                      </div>
                    <div className="flex flex-row-reverse pt-2">
                      <button type = "submit" onClick={confirmDelete} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 w-26 font-medium rounded-lg text-l px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"><p>Save</p></button>
                      <button type = "button" onClick={closeModal} className="focus:outline-none text-white bg-neutral-700 hover:bg-neutral-800 focus:ring-4 focus:ring-neutral-300 w-26 font-medium rounded-lg text-l px-5 py-2.5 mr-2 mb-2 dark:bg-neutral-600 dark:hover:bg-neutral-700 dark:focus:ring-neutral-900"><p>Cancle</p></button>
                    </div>
                  </div>
                </form>  
           </Modal>

//modal without flex-------------------------------------------------------
{/* <Modal
isOpen={editModalIsOpen}
onAfterOpen={afterOpenModal}
onRequestClose={closeModal}
className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-y-auto w-[42rem] max-w-2xl max-[740px]:w-96 h-[38rem] bg-zinc-900"
contentLabel="Example Modal"
>
<form>
  <div className="text-white">
      <div className="">
        <p className="font-bold text-2xl text-center">Edit</p>
        <hr className="border-1 border-neutral-400 mt-3"/>
      </div>
      <div className="mx-3">
        <div className="flex flex-col border-2 border-white focus-within:border-indigo-300 rounded-lg mt-2 px-2 py-1.5 ">
          <label htmlFor="TodoName" className="text-white text-md font-bold">Todo Name</label>
          <input 
          id="TodoName"
          type="text"
          name="TodoName"
          value={isEditing[1]}
          onChange={(e) => setEdit(...isEditing+e.target.value)}
          
          className="inputTodoName"
          //{todoList.filter((task) => task.id == currentId[1])}
          //onChange={e => setFirstName(e.target.value)}
          >
          </input>
        </div>
      </div>
      <div className="mx-3 h-[26rem]">
        <div className="flex flex-col border-2 border-white focus-within:border-indigo-300 rounded-lg mt-2 px-2 py-1.5 h-full">
          <label htmlFor="firstName" className="text-white text-md font-bold">Details</label>
          <textarea  
          id="TodoDetails"
          type="text"
          name="TodoDetails"
          
          onChange={(e) => e.target.value}
          className="inputTodoDetails h-full"></textarea>
        </div>
      </div>
    <div className="flex flex-row-reverse pt-2">
      <button type = "submit" onClick={confirmDelete} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 w-26 font-medium rounded-lg text-l px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"><p>Save</p></button>
      <button type = "button" onClick={closeModal} className="focus:outline-none text-white bg-neutral-700 hover:bg-neutral-800 focus:ring-4 focus:ring-neutral-300 w-26 font-medium rounded-lg text-l px-5 py-2.5 mr-2 mb-2 dark:bg-neutral-600 dark:hover:bg-neutral-700 dark:focus:ring-neutral-900"><p>Cancle</p></button>
    </div>
  </div>
</form>  
</Modal> */}

// function editChange(e) {
//     setEdit(...isEditing+e.target.value)
// }



//(e) => setEdit(...isEditing+e.target.value)
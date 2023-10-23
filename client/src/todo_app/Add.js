import React from 'react'
import { useState } from 'react'
import axios from 'axios'

const Add = ({  setData, isAddModalOpen, setAddModal, addRef, setError}) => {
  
  const [userInput , setUserInput] = useState({title: "", details: ""})
  console.log(userInput)
  const handleInputOnchange = (e) => {
    setUserInput((prev)=> ({...prev , [e.target.name]: e.target.value}))
    
    
  }

  const closeAddModal = () => {
    setAddModal(false);
}

const csrf = localStorage.getItem('csrfToken');


const customHeaders = {
  'x-csrf-token': csrf,
  
};


const config = {
  headers: customHeaders,
  withCredentials: true, // Set withCredentials to true
};

  const handleClickAdd = async (e) => {
    //console.log("userInput",userInput)
    
    if (!userInput.title) {
      alert("Todo title must be filled.")
      e.preventDefault();
    } else {
        try {
          e.preventDefault();
          const res = await axios.post(`${process.env.REACT_APP_backend_URL}/todo_items`, userInput, config);

          if(Array.isArray(res.data) && res.data.length !== 0){
            setData(res.data)
            alert("Added Successfully!")
          } //Catch there is no todo item.
          else if (res.data.length === 0) {
            alert("There is no todo item.")
            setError("There is no todo item.")
            
          } //Catch if res.data === normal string, etc.
          else{
            setError("Error!")
          }
          setAddModal(false);
        } catch (err) {
          console.log(err);
          alert("Failed to add item!")
          setAddModal(false);
          //setUserInput(initialTodoInput)
          e.preventDefault();
        }
        
    }
        
  }

    
  return (
  <div id="signupModal" className="modal" style={isAddModalOpen === true ? {display: "block"}:{display: "none"}}>
    <div ref={addRef} className="h-full max-h-[39rem] w-full max-w-[34rem] absolute left-1/2 -translate-x-1/2 bg-zinc-900 rounded-lg m-auto p-3">
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
            maxLength="15"
           // value={userInput.title}
            onChange={handleInputOnchange}
            
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
            className="form-input h-full"
            ></textarea>
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

export default Add


// const AddForm2 = () => {

    
//   return (
//   <div id="signupModal" className="modal" style={isAddModalOpen === true ? {display: "block"}:{display: "none"}}>
//     <div ref={addRef} className="h-full max-h-[39rem] w-10/12 max-w-[34rem] absolute left-1/2 -translate-x-1/2 bg-zinc-900 rounded-lg m-auto p-3">
//       <div id="header" className='text-center'>
//       <span className='text-2xl font-bold'>New Todo<span className="close rounded-lg" onClick={closeAddModal} >&times;</span></span>
      
//       <hr className='mt-4 border-2'/>
//       </div>
      
//       <div className=' '>
//       <form className='form'>
//         <div className=' '>
//         <div className='form-col border-2 border-white focus-within:border-blue-600 rounded-lg mt-2 px-2 py-1.5 h-full'>
//           <label htmlFor='todoname' className='form-label'>
//             Todo Name
//           </label>
//           <input
//             type='text'
//             id='todoname'
//             className='form-input'
//             name="title"
//             maxLength="20"
//            // value={userInput.title}
//             onChange={handleInputOnchange}
            
//           />
//         </div>
//         <div className="h-[26rem]">
//           <div className="flex flex-col border-2 border-white focus-within:border-blue-600 rounded-lg mt-2 px-2 py-1.5 h-full">
//             <label htmlFor="firstName" className="text-white text-md font-bold">Details</label>
//             <textarea  
//             id="TodoDetails"
//             type="text"
//             name="details"
//            // value={userInput.details}
//             onChange={handleInputOnchange}
//             maxLength="500"
//             className="form-input h-full"
//             ></textarea>
//           </div>
//         </div>
//         <div className="flex">
//            <div className="w-1/2 my-auto text-xl font-bold"><p className={Object.keys(userInput.details).length === 500 ? "text-red-700":""}>{Object.keys(userInput.details).length}/500</p>
//            </div> 
//             <div className="flex justify-end pt-2 w-1/2">
//                 <button type='button' className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-blue-300 w-26 font-medium rounded-lg text-l px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800" onClick={closeAddModal}><p>Cancle</p></button>
//                 <button onClick={handleClickAdd}  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 w-26 font-medium rounded-lg text-l px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"><p>Add</p></button>
//             </div>
//         </div>
//       </div>
//     </form>
//       </div>
//     </div>
// </div>
// )}
import { useState } from "react";
import React from 'react';
import Modal from 'react-modal';
import editbtn from './components/edit.png';
//---------------------------------------------------------------------------------------------------------------
export function ButtonAddNums2() {
    // const users = [
    //   { name: 'a', age: 20 },
    //   { name: 'b', age: 22 },
    //   { name: 'c', age: 225 },
    // ]
  const [count, setCount] = useState(0)
  const random = "#" + Math.floor(Math.random()*16777215).toString(16);

  const increase = () => {
    setCount(count+1);
  };

  const increaseAsync = () => {
    setTimeout(() => {
      setCount((currentNumber) => currentNumber+1);
    }, 2000);
  };

  const Decrease = () => {
    setCount(count-1);
  };

  
  
  
  return(
    //  {users.map((user,key) => {
    //     return <User name={user.name} age={user.age} />
    //   })}
    <div className="">
      <div className="border-b-4 border-white pb-4">
        <div className="grid grid-cols-3 text-2xl ">
          <div className="TitleofFunction">1.Button Number Function</div>
          <div className=""><p className="text-center font-bold">Numbers Count <span className="text-4xl" style={{color: random}}>&nbsp;&nbsp;{count}</span></p> </div>
          <div></div> 
            
        </div>
          
        
        <div className="flex justify-center gap-2 text-2xl pt-3">
          
          <button className="bg-sky-500 rounded p-1" onClick={increase}>Increase</button>
          <button className="bg-slate-800 rounded p-1" onClick={increaseAsync}>IncreaseAsync</button>
          <button className="bg-red-500 rounded p-1" onClick={Decrease}>Decrease</button>
          <button className="bg-green-500 rounded p-1" onClick={() => { setCount(0) }}>Set to 0</button>
        </div>

        {/* <div className="flex justify-center gap-2 text-2xl pt-3">
          
          <button className="bg-sky-500 rounded p-1" onClick={() =>  setCount(prevCount => prevCount + 1 ) }>Increase</button>
          <button className="bg-red-500 rounded p-1" onClick={() =>  setCount(prevCount => prevCount - 1 ) }>Decrease</button>
          <button className="bg-green-500 rounded p-1" onClick={() => setCount(0) }>Set to 0</button>
        </div> */}
        
        
      </div>
      </div>
  )

}
//------------------------------------------------------map practice---------------------------------------------------
export function MapPrac2(){
    const planets = [
      { name: "Mars", isGasPlanet: false ,id: 0},
      { name: "Earth", isGasPlanet: false ,id: 1},
      { name: "Jupiter", isGasPlanet: true ,id: 2},
      { name: "Venus", isGasPlanet: false ,id: 3},
      { name: "Neptune", isGasPlanet: true ,id: 4},
      { name: "Uranus", isGasPlanet: true ,id: 5},
      { name: "test1", isGasPlanet: true ,id: 6},
      { name: "test2", isGasPlanet: true ,id: 7},
      { name: "test3", isGasPlanet: true ,id: 8},
    ];
    const gasplanets = []
    const nongasplanets = []
    const NameOfPlanet = (props) => {
        return (
            <div>
              <h2>{props.name123}</h2>
            </div>
        )
      }
    
      return( 
      <div>{planets.map((cannamedwhatever) => {
        return (<div> 
          {(() => {if(cannamedwhatever.isGasPlanet === true) {
            gasplanets.push(cannamedwhatever.name)
          } else if (cannamedwhatever.isGasPlanet === false) {
            nongasplanets.push(cannamedwhatever.name)
          }
          })()}
      </div>)
        
        //cannamedwhatever.isGasPlanet === true ?  gasplanets.push(cannamedwhatever.name) : nongasplanets.push(cannamedwhatever.name)
      })}

          <div className="border-b-4 border-white pb-3">
            <div className="TitleofFunction">2.Map Practice </div>
              <div className="grid grid-cols-3 gap-4 pt-3">
              <div className="">
                  <div className="font-bold">All Planets</div>
                  <div className="">
                    <h2>{planets.map((allplanets) => {
                      return <div key={allplanets.id}>{allplanets.name} </div>
                    })}</h2>
                  </div>
                </div>
                <div className="">
                  <div className="font-bold">Gas Planets</div>
                  <div className="">
                    <h2>{gasplanets.map((names) => {
                      return <div>{names} </div>
                    })}</h2>
                  </div>
                </div>
                <div className="">
                  <div className="font-bold">Non Gas Planets</div>
                  <div className="">
                    <h2>{nongasplanets.map((names) => {
                      return <div>{names} </div>
                    })}</h2>
                  </div>
                </div>
              </div>
              <br/>
              <div> <p className="font-bold">Example of loop through array and Pass Value to above function using map  </p>
                {planets.map((passvaluetoNameOfPlanetfunction) => {
                      return passvaluetoNameOfPlanetfunction.isGasPlanet === true ?  <NameOfPlanet name123={passvaluetoNameOfPlanetfunction.name} /> : ''
                    })}
              </div>
          </div>
      </div> )
      //<NameOfPlanet nameofplanet={cannamedwhatever.name}/>
}
//---------------------------------------------------------CRUD---------------------------------------------

const EditModalComponent = ({newTask, newDetails,editModalIsOpen,afterOpenModal,closeModal, confirmEdit ,handleChangeTitle ,handleChangeDetail}) => {
  return(
    <Modal
              isOpen={editModalIsOpen}
              onAfterOpen={afterOpenModal}
              onRequestClose={closeModal}
              className="absolute flex top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-full overflow-y-auto max-h-[38rem] bg-zinc-900"
              contentLabel="Example Modal"
              >
              <form className="w-full">
                <div className="mx-3 text-white">
                    <div className="">
                      <p className="font-bold text-2xl text-center">Edit</p>
                      <hr className="border-1 border-neutral-400 mt-3"/>
                    </div>
                    <div className="">
                      <div className="flex flex-col border-2 border-white focus-within:border-indigo-300 rounded-lg mt-2 px-2 py-1.5 ">
                        <label htmlFor="TodoName" className="text-white text-md font-bold">Todo Name</label>
                        <input 
                        id="TodoName"
                        type="text"
                        name="TodoName"
                        value={newTask}
                        onChange={handleChangeTitle}
                        maxLength="50"
                        className="inputTodoName"
                        //{todoList.filter((task) => task.id == currentId[1])}
                        //onChange={e => setFirstName(e.target.value)}
                        >
                        </input>
                      </div>
                    </div>
                    <div className="h-[26rem]">
                      <div className="flex flex-col border-2 border-white focus-within:border-indigo-300 rounded-lg mt-2 px-2 py-1.5 h-full">
                        <label htmlFor="firstName" className="text-white text-md font-bold">Details</label>
                        <textarea  
                        id="TodoDetails"
                        type="text"
                        name="TodoDetails"
                        value={newDetails}
                        onChange={handleChangeDetail}
                        maxLength="500"
                        className="inputTodoDetails h-full"></textarea>
                      </div>
                    </div>
                  <div className="flex">
                    <div className="my-auto w-1/2 text-xl font-bold"><p className={newDetails.length == 500 ? "text-red-700":""}>{newDetails.length}/500</p></div>
                    <div className="flex flex-row-reverse pt-2 w-1/2">
                      <button type = "submit" onClick={confirmEdit} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 w-26 font-medium rounded-lg text-l px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"><p>Save</p></button>
                      <button type = "button" onClick={closeModal} className="focus:outline-none text-white bg-neutral-700 hover:bg-neutral-800 focus:ring-4 focus:ring-neutral-300 w-26 font-medium rounded-lg text-l px-5 py-2.5 mr-2 mb-2 dark:bg-neutral-600 dark:hover:bg-neutral-700 dark:focus:ring-neutral-900"><p>Cancle</p></button>
                    </div>
                  </div>
                </div>
              </form>  
         </Modal>
  )
}

const TaskComponent = ({newTask, handleChange, addTask, editModalIsOpen}) => {
  return(
    <div className="flex pt-2">
      <div className="TitleofFunction">3.CRUD Function</div>
      <div className="sticky left-1/2 -translate-x-1/4">
        <form className="">
        <input onChange={handleChange} type="text" value={editModalIsOpen?"":newTask} maxLength="50" className="text-black pl-2"/>
        <button onClick={addTask} type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 ml-4 rounded">Add Task</button>
        </form>
        
      </div>
    </div>
  )
}
export default function CRUD2(){
  
  const [currentId, setCurrentId] = useState();
  const [todoList, setTodoList] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [newDetails, setNewDetails] = useState("");
  const [isEditing, setEdit] = useState("");

  

  const handleChangeDetail = (event) => {
    setNewDetails(event.target.value);
  }

  //----Set up Modal----- >
  Modal.setAppElement('#root');
  
  

  

  const [deleteModalIsOpen, setDeleteIsOpen] = useState(false);
  const [editModalIsOpen, setEditIsOpen] = useState(false);

 

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    
     
  }
  
  function closeModal() {
    setCurrentId([currentId,])
    setEdit([""])
    setEditIsOpen(false);
    setDeleteIsOpen(false);
    setNewTask("");
    
  }
  
 
  

  const addTask = (e) => {
    if (!newTask) {
      alert("Value is empty")
      e.preventDefault();
    } else {
      alert("Value is filled")
      const task = {
        id: todoList.length === 0 ? 1 : todoList[todoList.length -1].id +1,
        taskName: newTask,
        details: '',
      };
      setTodoList([...todoList, task]);
      e.preventDefault();
      setNewTask("");
      // {console.log(todoList[todoList.length -1].id +1)}
      // {console.log(todoList)}
      
      
    }
  };
  
  // if (deleteTask === true) {
  //   setTodoList(todoList.filter((task) => task.id !== id));
  //   setDeleteIsOpen(false);
  //   console.log(555)
  // }
  
  

  const handleEdit = (id) => {
   // const todoListName = todoList.filter((task) => task.id == id);
    setCurrentId([currentId,id])
    setNewTask(todoList.find(findId => findId.id === id).taskName)
    setNewDetails(todoList.find(findId => findId.id === id).details)
    setEditIsOpen(true);
   // setEdit([isEditing,todoListName[0].taskName])
    //console.log(todoList.filter((task) => task.id == id))
   // const todoListName = todoList.filter((task) => task.id == currentId[1]);
  }

  
  
  
  const confirmEdit = (e) => {
    if (newTask == "") {
      alert("This field can not be blank.")
      e.preventDefault()
    } else {
      setTodoList([...todoList],todoList.find(findId => findId.id === currentId[1]).taskName = newTask)
      setTodoList([...todoList],todoList.find(findId => findId.id === currentId[1]).details = newDetails)
      e.preventDefault()
      setNewTask("");
      setEditIsOpen(false);
    }
    // const tt = todoList.filter((task) => task.id == currentId[1]);
 }
 
 
 
  
 
  const handleDelete = (id) => {
    setCurrentId([currentId,id])
    setDeleteIsOpen(true);
  }
  const confirmDelete = () => {
     setTodoList(todoList.filter((task) => task.id !== currentId[1]));
     setDeleteIsOpen(false);
  }
  
  console.count(0)
  
  const DeleteModalComponent = () => {
    
    return(
      <Modal
                isOpen={deleteModalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 h-52 deletemodal:h-[11.5rem] w-1/2  max-w-xl  -translate-y-1/2 bg-zinc-900 rounded-lg "
                contentLabel="Example Modal"
                >
                <form>
                  <div className="">
                    <div className="">
                      <p className="font-bold text-2xl text-white pl-2 pt-2">Delete Confirmation</p>
                      <hr className="border-1 border-neutral-400 mt-3"/>
                      <p className="text-white text-xl pt-6 pl-2">Are you sure you want to delete this item?</p>
                      <hr className="border-1 border-neutral-400 mt-6"/>
                    </div>
                    <div className="flex flex-row-reverse pt-2">
                      <button onClick={confirmDelete} className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 w-26 font-medium rounded-lg text-l px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"><p>Delete</p></button>
                      <button onClick={closeModal} className="focus:outline-none text-white bg-neutral-700 hover:bg-neutral-800 focus:ring-4 focus:ring-neutral-300 w-26 font-medium rounded-lg text-l px-5 py-2.5 mr-2 mb-2 dark:bg-neutral-600 dark:hover:bg-neutral-700 dark:focus:ring-neutral-900"><p>Cancle</p></button>
                    </div>
                  </div>
                </form>  
            </Modal>
    )
    
  }

 

  const Edit_Delete_Btn = ({ todoList,  handleEdit, handleDelete}) => {
    return (
      <div>
      {todoList.map((task) => {
        return (
        <div className="grid grid-cols-2 mt-5" >
          <div className="qqq"><p className="break-words">{task.taskName}</p></div>
            <div className="grid grid-cols-2 mx-auto"> 
              <button type = "button" onClick={() => handleEdit(task.id)} className="text-white w-24 h-11 border-4 border-white rounded-lg flex"><img src={editbtn} className="mt-1 ml-1 w-7"></img><p className="ml-4 pt-1 font-medium text-xl">Edit</p></button> 
              <button type = "button" onClick={() => handleDelete(task.id)} className="text-white bg-red-700 hover:bg-red-800  w-24 h-11 rounded-lg mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700"><p className="text-xl font-medium">Delete</p></button>
              
            </div>
        </div>
        //edit button https://www.iconsdb.com/white-icons/edit-3-icon.html
        //<button onClick={() => deleteTask(task.id)} className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 w-32 font-medium rounded-lg text-xl px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"><p>Delete</p></button>
        )
      })}
      </div>
    )
  }
  
  return(
    <div className="border-b-4 border-white pb-4">
      <TaskComponent newTask={newTask} handleChange={(e)=> {setNewTask(e.target.value)}} addTask={addTask} editModalIsOpen={editModalIsOpen} />
      <div className="flex justify-center">
        <div className="">
          <Edit_Delete_Btn todoList={todoList} handleEdit={handleEdit} handleDelete={handleDelete} />
          <DeleteModalComponent />
          <EditModalComponent handleChangeTitle={(e)=>setNewTask(e.target.value)} newTask={newTask} newDetails={newDetails} 
          editModalIsOpen={editModalIsOpen} afterOpenModal={afterOpenModal} closeModal={closeModal} confirmEdit={confirmEdit} 
           handleChangeDetail={handleChangeDetail}/>
            

            

        </div>
      </div>
    </div>
    
  )
}
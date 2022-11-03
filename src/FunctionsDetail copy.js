import { useState } from "react";
import React from 'react';
import Modal from 'react-modal';
import editbtn from './components/edit.png';
//---------------------------------------------------------------------------------------------------------------
export function ButtonAddNums() {
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
      <div className="border-b-4 border-white-500 pb-4">
        <div className="grid grid-cols-3 text-2xl ">
          <div className="TitleofFunction">1.Button Number Function</div>
          <div className=""><p class="text-center font-bold">Numbers Count <span class="text-4xl" style={{color: random}}>&nbsp;&nbsp;{count}</span></p> </div>
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
  )

}
//------------------------------------------------------map practice---------------------------------------------------
export function MapPrac(){
    const planets = [
      { name: "Mars", isGasPlanet: false },
      { name: "Earth", isGasPlanet: false },
      { name: "Jupiter", isGasPlanet: true },
      { name: "Venus", isGasPlanet: false },
      { name: "Neptune", isGasPlanet: true },
      { name: "Uranus", isGasPlanet: true },
      { name: "test1", isGasPlanet: true },
      { name: "test2", isGasPlanet: true },
      { name: "test3", isGasPlanet: true },
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

          <div className="border-b-4 border-white-500 pb-3">
            <div className="TitleofFunction">2.Map Practice </div>
              <div className="grid grid-cols-3 gap-4 pt-3">
              <div className="">
                  <div className="font-bold">All Planets</div>
                  <div className="">
                    <h2>{planets.map((allplanets) => {
                      return <div>{allplanets.name} </div>
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
export function CRUD(){
  const [checkDelete, setCheckDelete] = useState(false);
  const [currentId, setCurrentId] = useState();
  const [todoList, setTodoList] = useState([]);
  const [newTask, setNewTask] = useState("");

  const handleChange = (event) => {
    setNewTask(event.target.value);
  }
  //----Set up Modal----- >
  Modal.setAppElement('#root');
  
  const deleteStyles = {
    content: {
      width: '30%',
      
      height: '24%',
      margin: 'auto',
      
    }
  };

  const editStyles = {
    content: {
      width: '80%',
      height: '500px',
      margin: 'auto',
      
    }
  };

  const [deleteModalIsOpen, setDeleteIsOpen] = React.useState(false);
  const [editModalIsOpen, setEditIsOpen] = React.useState(false);

  function openModal() {
    setDeleteIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    console.log(currentId[1])
     
  }

  function closeModal() {
    setCurrentId([currentId,])
    setEditIsOpen(false);
    setDeleteIsOpen(false);
    
  }
  
  //----Set up Modal----- />
  // const handleReset = () => {
  //   setNewTask("");
  // }
  

  const addTask = (e) => {
    if (!newTask) {
      alert("Value is empty")
      e.preventDefault();
    } else {
      alert("Value is filled")
      const task = {
        id: todoList.length === 0 ? 1 : todoList[todoList.length -1].id +1,
        taskName: newTask,
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
    setCurrentId([currentId,id])
    setEditIsOpen(true);
  }
  const confirmEdit = () => {
    
    setDeleteIsOpen(false);
 }

  const handleDelete = (id) => {
    setCurrentId([currentId,id])
    setDeleteIsOpen(true);
  }
  
  const confirmDelete = () => {
     setTodoList(todoList.filter((task) => task.id !== currentId[1]));
     setDeleteIsOpen(false);
  }
  

  return(
    <div>
      <div className="grid grid-cols-3 pt-2">
        <div className="TitleofFunction">3.CRUD Function</div>
        <div className="flex justify-center">
          <form>
          <input onChange={handleChange} type="text" value={newTask} className="text-black pl-2"/>
          <button onClick={addTask} type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 ml-4 rounded">Add Task</button>
          </form>
          
          
          
        </div>
        <div></div>
      
        
        
      </div>
      <div className="flex justify-center">
        <div className="">
            {todoList.map((task) => {
              return (
              <div className="grid grid-cols-2 mt-5">
                <p>{task.taskName}</p>
                  <div className="grid grid-cols-2"> 
                    <button onClick={() => handleEdit(task.id)} className="text-white w-24 h-11 border-4 border-white rounded-lg flex"><img src={editbtn} width="24px" className="mt-1 ml-1"></img><p className="ml-4 pt-1 font-medium text-xl">Edit</p></button> 
                    <button onClick={() => handleDelete(task.id)} className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 w-24 h-11 rounded-lg mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"><p className="text-xl font-medium">Delete</p></button>
                    
                  </div>
              </div>
              //edit button https://www.iconsdb.com/white-icons/edit-3-icon.html
              //<button onClick={() => deleteTask(task.id)} className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 w-32 font-medium rounded-lg text-xl px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"><p>Delete</p></button>
              )
            })}
            <Modal
                isOpen={deleteModalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={deleteStyles}
                contentLabel="Example Modal"
                >
                <form>
                  <div>
                    <div className="">
                      <p className="font-bold text-2xl text-black">Delete Confirmation</p>
                      <hr className="border-1 border-neutral-400 mt-3"/>
                      <p className="text-slate-500 text-xl pt-6">Are you sure you want to delete this item?</p>
                      <hr className="border-1 border-neutral-400 mt-6"/>
                    </div>
                    <div className="flex flex-row-reverse pt-2">
                      <button onClick={confirmDelete} className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 w-26 font-medium rounded-lg text-l px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"><p>Delete</p></button>
                      <button onClick={closeModal} className="focus:outline-none text-white bg-neutral-700 hover:bg-neutral-800 focus:ring-4 focus:ring-neutral-300 w-26 font-medium rounded-lg text-l px-5 py-2.5 mr-2 mb-2 dark:bg-neutral-600 dark:hover:bg-neutral-700 dark:focus:ring-neutral-900"><p>Cancle</p></button>
                    </div>
                  </div>
                </form>  
            </Modal>

            <Modal
                isOpen={editModalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-y-auto h-96 min-h-vh sm:w-3/12 md:w-4/12 lg:w-5/12 xl:w-7/12 2xl:w-9/12 bg-white"
                contentLabel="Example Modal"
                >
                <form>
                  <div>
                    <div className="">
                      <p className="font-bold text-2xl text-black text-center">Edit</p>
                      <hr className="border-1 border-neutral-400 mt-3"/>
                      <p className="text-slate-500 text-xl pt-6">Are you sure you want to delete this item?</p>
                      <hr className="border-1 border-neutral-400 mt-6"/>
                    </div>
                    <div className="flex flex-row-reverse pt-2">
                      <button onClick={confirmDelete} className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 w-26 sm:w-1/12 md:w-3/12 lg:w-6/12 xl:w-9/12 2xl:w-5/5  rounded-lg  px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"><p className="font-medium text-l">Delete</p></button>
                      <button onClick={closeModal} className="focus:outline-none text-white bg-neutral-700 hover:bg-neutral-800 focus:ring-4 focus:ring-neutral-300 w-26 sm:w-1/12 md:w-3/12 lg:w-6/12 xl:w-9/12 2xl:w-5/5 rounded-lg  px-5 py-2.5 mr-2 mb-2 dark:bg-neutral-600 dark:hover:bg-neutral-700 dark:focus:ring-neutral-900"><p className="font-medium text-l ">Cancle</p></button>
                    </div>
                  </div>
                </form>  
            </Modal>

        </div>
      </div>
    </div>
    
  )
}
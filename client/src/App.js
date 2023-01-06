
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import {Outlet} from "react-router-dom";
import SharedLayout from './SharedLayout';
import Login from './todo_app/Login';
import Home from './Home';

import  Functions  from "./Functions";
import  Portfolio_2  from "./Portfolio_2";
import Todo_items from "./todo_app/Todo_items";
import CRUD2 from "./FunctionsDetail copy";
import Prac_React_App from './todo_app/prac/Prac_React_App';
import Prac_Create from './todo_app/prac/Prac_Create'
import Prac_BlogDetails from './todo_app/prac/Prac_BlogDetails';
import Prac_Navbar from './todo_app/prac/Prac_Navbar';


function App() {
  
   
  const [user,setUser] =useState(null)
  return (
    <div className="h-full">
       <BrowserRouter>
      <Routes>
      <Route path='/'  element={<SharedLayout />} >
          <Route index path="portfolio"   element={<Home />} />
            <Route path='portfolio_2'    element={<Portfolio_2 />} />
            <Route path='functions' element={<Functions />} />
            <Route path='todo_items' element={<Todo_items />} /> 
            <Route path='login' element={<Login />} /> 


            <Route path='prac_home' element={<Prac_React_App />} />
            <Route path='prac_create' element={<Prac_Create />} /> 
            <Route path='blogs/:id' element={<Prac_BlogDetails />}/>
            
            
          
          {/* <Route path='login' element={<Login setUser={setUser}></Login>} />
          <Route path='dashboard' 
          element={
          <ProtectedRoute user={user}>
          <Dashboard user={user} /> 
          </ProtectedRoute> 
          } />
          <Route path='*'         element={<Error />} /> */}
         </Route>
         
      </Routes>
      </BrowserRouter> 
      
      

      

    </div>
      
    
  );
}



export default App;

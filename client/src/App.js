
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import {Outlet} from "react-router-dom";
import SharedLayout from './SharedLayout';
import Login from './todo_app/Login';
import Home from './Home';

import  Functions  from "./Functions";
import  Portfolio_2  from "./Portfolio_2";
import Todo_items from "./todo_app/Todo_items";




function App() {
  
   
  const [user,setUser] =useState(null)
  return (
    <div className="flex flex-col flex-wrap">
       <BrowserRouter>
      <Routes>
      <Route path='/'  element={<SharedLayout />} >
          <Route index path="portfolio"   element={<Home />} />
          <Route path='portfolio_2'    element={<Portfolio_2 />} />
          <Route path='functions' element={<Functions />} />
          <Route path='todo_items' element={<Todo_items />} /> 
          <Route path='login' element={<Login />} /> 
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

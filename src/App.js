
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import {Outlet} from "react-router-dom"
import SharedLayout from './SharedLayout';
import Login from './Login';
import Home from './Home';
import { ButtonAddNums } from "./FunctionsDetail"
import { MapPrac } from "./FunctionsDetail"
import  {CRUD}  from "./FunctionsDetail"
import  Functions  from "./Functions"




function App() {
  
   
  const [user,setUser] =useState(null)
  return (
    <div className="flex flex-col flex-wrap">
       <BrowserRouter>
      <Routes>
      <Route path='/'  element={<SharedLayout />} >
          <Route index   element={<Home />} />
          <Route path='mapprac'    element={<MapPrac />} />
          <Route path='btnaddnums' element={<ButtonAddNums />} />
          <Route path='crud' element={<CRUD />} />
          <Route path='functions' element={<Functions />} />
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

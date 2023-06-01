
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import SharedLayout from './SharedLayout';
import Login from './todo_app/Login';
import Home from './Home';

import  Functions  from "./Functions";
import  Portfolio_2  from "./Portfolio_2";
import Todo_items from "./todo_app/Todo_items";

import Prac_React_App from './todo_app/prac/Prac_React_App';
import Prac_Create from './todo_app/prac/Prac_Create'
import Prac_BlogDetails from './todo_app/prac/Prac_BlogDetails';
import Test from "./todo_app/prac/Test"
import NotFound from './NotFound';
import Email_Verification_Page from './todo_app/Email_Verification_Page';
import Email_Verification_Success from './todo_app/Email_Verification_Success';
import Error_Page from './Error_Page';


function App() {
  
   
  const [user,setUser] =useState(null)
  return (
    <div className="h-full w-full min-w-[48rem]">
       <BrowserRouter>
      <Routes>
      <Route path='/'  element={<SharedLayout />} >
          <Route index path="portfolio"   element={<Home />} />
            <Route path='portfolio_2'    element={<Portfolio_2 />} />
            <Route path='functions' element={<Functions />} />
            <Route path='todo_items' element={<Todo_items />} /> 
            <Route path='login' element={<Login />} />
            
            <Route path='Error_Page' element={<Error_Page />} />  

            <Route path='Email_Verification_Page' element={<Email_Verification_Page />} />  
            <Route path='Email_Verification_Success' element={<Email_Verification_Success />} />  
            

            <Route path='prac_home' element={<Prac_React_App />} />
            <Route path='prac_create' element={<Prac_Create />} /> 
            <Route path='blogs/:id' element={<Prac_BlogDetails />}/>
            <Route path='test' element={<Test />}/>
            
            
          
          {/* <Route path='login' element={<Login setUser={setUser}></Login>} />
          <Route path='dashboard' 
          element={
          <ProtectedRoute user={user}>
          <Dashboard user={user} /> 
          </ProtectedRoute> 
          } />
          <Route path='*'         element={<Error />} /> */}
         </Route>
         <Route path='*'         element={<NotFound />} />
         
      </Routes>
      </BrowserRouter> 
      
      

      

    </div>
      
    
  );
}



export default App;

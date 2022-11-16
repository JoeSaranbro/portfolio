import { useEffect, useState } from 'react';
import { IconContext } from "react-icons";
import { FaArrowRight } from "react-icons/fa";
import  profile_pic  from "./components/profile_pic.jpg";
import html5logo from "./components/html5.png";
import csslogo from "./components/css.png";
import javascriptlogo from "./components/javascript.png";
import reactlogo from "./components/logo192.png";
import tailwindlogo from "./components/tailwind_logo.png";
import mysql_logo from "./components/mysql.png";





  

const Home = () => {
  

  const [show,setShow] = useState("");
  
  const Info = () => {
   return ( 
    <div className='w-full flex flex-row'>
      <div className=" w-1/2  mx-auto">
          <div id="name" className="text-info ">Saran Kunsutha (Joe)
            <div className="fadingEffect" style={{animationDelay:"1.2s"}}></div>
          </div>
          <div id="name" className="text-info ">22 years old
            <div className="fadingEffect" style={{animationDelay:"2.5s"}}></div>
          </div>
          
      </div>
      <div className="w-1/2 mx-auto">
          <div id="name" className="text-info ">Information Technology (IT) Student
            <div className="fadingEffect" style={{animationDelay:"3.6s"}}></div>
          </div>
          <div id="name" className="text-info ">From Suan Dusit University
            <div className="fadingEffect" style={{animationDelay:"5.5s"}}></div>
          </div>
          
      </div>
    </div>
    )

  }

  return (
    <div className="mx-10">
      
      <div className="header">
        <div className="text-welcome">Welcome to my Portfolio.
        <div className="fadingEffect"></div>
        </div>
        <div className="flex">
          <IconContext.Provider value={{ size: "4em" }}>
            <div id ="arrow" className="mt-24 fadein-left-arrow"><FaArrowRight />
            
            </div>
          </IconContext.Provider>
          <img src={profile_pic} className="max-w-full h-auto w-48 max-h-48 ml-28 mt-6 fadein-bottom "></img>
          <Info/>
        </div>
          <div className='flex w-full mt-10'>
            <p className='text-4xl font-bold fadein-top' style={{animationDelay:"7.5s"}}>Skills</p>
            <div className='flex gap-16 border-solid border-2 border-white ml-20 w-full fadein-zoom text-center px-auto' style={{animationDelay:"8s"}}>
              <div className=''>
                <img src={html5logo} className="max-w-full h-auto w-32 max-h-32 fadein-top" style={{animationDelay:"8.5s"}}></img>
                <p className='text-2xl font-bold fadein-bottom' style={{animationDelay:"8.5s"}}>HTML 5</p>
              </div>
              <div className=''>
                <img src={javascriptlogo} className="max-w-full h-auto w-32 max-h-32 fadein-top" style={{animationDelay:"9.5s"}}></img>
                <p className='text-2xl font-bold fadein-bottom ' style={{animationDelay:"9.5s"}}>Javascipt</p>
              </div>
              <div className=''>
                <img src={csslogo} className="max-w-full h-auto w-32 min-w-[8rem] max-h-32 fadein-top" style={{animationDelay:"10.5s"}}></img>
                <p className='text-2xl font-bold fadein-bottom ' style={{animationDelay:"10.5s"}}>CSS</p>
              </div>
              <div className=''>
                <img src={tailwindlogo} className="max-w-full h-auto w-64 min-w-[16rem] fadein-top mx-auto" style={{animationDelay:"11.5s"}}></img>
                <p className='text-2xl font-bold fadein-bottom ' style={{animationDelay:"11.5s"}}>Tailwind CSS Framework</p>
              </div>
              <div className=''>
                <img src={reactlogo} className="max-w-full h-auto w-32 max-h-32 fadein-top" style={{animationDelay:"12.5s"}}></img>
                <p className='text-2xl font-bold fadein-bottom ' style={{animationDelay:"12.5s"}}>React JS</p>
              </div>
              <div className=''>
                <img src={mysql_logo} className="max-w-full h-auto w-32 max-h-32 fadein-top" style={{animationDelay:"13.5s"}}></img>
                <p className='text-2xl font-bold fadein-bottom mt-10' style={{animationDelay:"13.5s"}}>MySQL</p>
              </div>
              
            </div>
          </div>
        
       
      </div>
      
   
    </div>
  );
};
export default Home;

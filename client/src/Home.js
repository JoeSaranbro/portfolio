import React from 'react';
import { Link } from "react-router-dom";
import { IconContext } from "react-icons";
import { FaArrowRight } from "react-icons/fa";
import { ImArrowUp2 } from "react-icons/im";
import  profile_pic  from "./components/profile_pic.jpg";
import html5logo from "./components/html5.png";
import csslogo from "./components/css.png";
import javascriptlogo from "./components/javascript.png";
import reactlogo from "./components/logo192.png";
import tailwindlogo from "./components/tailwind_logo.png";
import mysql_logo from "./components/mysql.png";
import car from "./components/car.PNG";
import plate from "./components/plate.PNG";
import result from "./components/result.PNG";




const Info = () => {
  return ( 
   <div className='flex flex-row'>
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
         <div id="name" className="text-info ">From Suan Dusit University <br/><span className='text-xl italic'>Fresh Graduate 2022</span>
           <div className="fadingEffect" style={{animationDelay:"5.5s"}}></div>
         </div>
         
     </div>
   </div>
   )

 }

  

const Home = () => {

const clickMeBtn = () => {
  document.getElementById("showproj").style.display = "block"
}


  
  
  

  return (
    <div className="mx-10">
      
      <div className="header">
        <div className="text-welcome">Welcome to my Portfolio.
        <div className="fadingEffect"></div>
        </div>
        <div className="relative inline-block">
          <IconContext.Provider value={{ size: "4em" }}>
            <div id ="arrow" className="pt-24 fadein-left-arrow absolute  ">
              <FaArrowRight />
            </div>
          </IconContext.Provider>
          <img src={profile_pic} className="h-auto w-48 max-h-48 ml-28 mt-6 fadein-bottom "></img>
          <Info />
        </div>
          <div className='flex  mt-10 '>
            <p className='text-4xl font-bold fadein-top underline' style={{animationDelay:"7.5s"}}>Skills</p>
            <div className='flex flex-wrap ml-10 justify-center gap-20 border-solid border-8 border-white rounded-3xl fadein-zoom text-center' style={{animationDelay:"8s"}}>
              <div className='my-5'>
                <img src={html5logo} className="max-w-full h-auto w-32 max-h-32 fadein-top" style={{animationDelay:"8.5s"}}></img>
                <p className='text-2xl font-bold fadein-bottom' style={{animationDelay:"8.5s"}}>HTML 5</p>
              </div>
              <div className='my-5'>
                <img src={javascriptlogo} className="max-w-full h-auto w-32 max-h-32 fadein-top" style={{animationDelay:"9.5s"}}></img>
                <p className='text-2xl font-bold fadein-bottom ' style={{animationDelay:"9.5s"}}>Javascipt</p>
              </div>
              <div className='my-5'>
                <img src={csslogo} className="max-w-full h-auto w-32 min-w-[8rem] max-h-32 fadein-top" style={{animationDelay:"10.5s"}}></img>
                <p className='text-2xl font-bold fadein-bottom ' style={{animationDelay:"10.5s"}}>CSS</p>
              </div>
              <div className='my-5'>
                <img src={tailwindlogo} className="max-w-full h-auto w-64 min-w-[16rem] fadein-top mx-auto" style={{animationDelay:"11.5s"}}></img>
                <p className='text-2xl font-bold fadein-bottom ' style={{animationDelay:"11.5s"}}>Tailwind CSS Framework</p>
              </div>
              <div className='my-5'>
                <img src={reactlogo} className="max-w-full h-auto w-32 max-h-32 fadein-top" style={{animationDelay:"12.5s"}}></img>
                <p className='text-2xl font-bold fadein-bottom ' style={{animationDelay:"12.5s"}}>React JS</p>
              </div>
              <div className='my-5'>
                <img src={mysql_logo} className="max-w-full h-auto w-32 max-h-32 fadein-top" style={{animationDelay:"13.5s"}}></img>
                <p className='text-2xl font-bold fadein-bottom mt-10' style={{animationDelay:"13.5s"}}>MySQL</p>
              </div>
              
            </div>
          </div>
          <div className='flex w-full mt-8'>
            <div className='flex flex-col'>
            <p className='text-4xl font-bold fadein-top underline' style={{animationDelay:"15s"}}>Project</p>
            <button onClick={clickMeBtn} className='text-xl font-bold fadein-top bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-full mt-4' style={{animationDelay:"16s"}}>Click Me</button>
            <IconContext.Provider value={{ size: "4em" }}>
            <div id ="arrow" className="mt-24 fadein-up-arrow" style={{animationDelay:"16.3s"}}><ImArrowUp2 />
      
            </div>
          </IconContext.Provider>
            </div>
            <div id="showproj" className='flex gap-20 border-solid border-8 border-white rounded-3xl ml-12 py-4 w-4/5 min-w-max fadein-zoom text-center' style={{display:"none"}}>
              <p className='text-3xl text-left p-2'><span className='font-bold underline underline-offset-8'>Project Name </span> : A Comparison License Plate Detection and Recognition by using Deep Learning</p>
              <p className='text-3xl text-left p-2'><span className='font-bold underline underline-offset-8'>Tools </span> : For License Plate Detection - YoloV4 , SSD-Mobilenet <br/><span className='pl-24 pt-2'>For License Plate Reader/Recognition - 
                Google Vision API , EasyOCR</span></p>
              <hr className='mt-4'/>
              
              <div className='flex gap-12 mt-2'><p className='text-3xl font-bold underline underline-offset-8'>Example:</p>
              <img src={car} className="max-w-full h-auto w-72 max-h-48 "></img>
              <img src={plate} className="max-w-full h-auto w-72 max-h-48 "></img>
              <img src={result} className="max-w-full h-auto w-72 max-h-48 "></img>
              <div className='py-20 px-3'><Link to="/portfolio_2" className="text-xl font-bold bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-full mt-4">Go Next</Link></div>
              <IconContext.Provider value={{ size: "4em" }}>
            <div id ="arrow" className="mt-24 fadein-up-arrow-gonext"><ImArrowUp2 />
            </div>
          </IconContext.Provider>
              </div>
              
            </div>
          </div>
      </div>
    </div>
  );
};
export default Home;

import React from "react";
import { Link } from "react-router-dom";
import { IconContext } from "react-icons";
import { FaArrowRight } from "react-icons/fa";
import { ImArrowUp2 } from "react-icons/im";
import profile_pic from "./components/images/profile_pic.jpg";
import html5logo from "./components/images/html5.png";
import csslogo from "./components/images/css.png";
import javascriptlogo from "./components/images/javascript.png";
import reactlogo from "./components/images/logo192.png";
import tailwindlogo from "./components/images/tailwind_logo.png";
import mysql_logo from "./components/images/mysql.png";
import car from "./components/images/car.PNG";
import plate from "./components/images/plate.PNG";
import result from "./components/images/result.PNG";

const Info = () => {
  return (
    <div className="flex flex-row">
      <div className=" mx-auto">
        <div id="name" className="text-info ">
          Saran Kunsutha (Joe)
          <div
            className="fadingEffect"
            style={{ animationDelay: "1.2s" }}
          ></div>
        </div>
        <div id="name" className="text-info ">
          24 years old
          <div
            className="fadingEffect"
            style={{ animationDelay: "2.5s" }}
          ></div>
        </div>
      </div>
      <div className=" mx-auto">
        <div id="name" className="text-info ">
          Information Technology (IT) Student
          <div
            className="fadingEffect"
            style={{ animationDelay: "3.6s" }}
          ></div>
        </div>
        <div id="name" className="text-info ">
          From Suan Dusit University <br />
          <span className="text-xl italic">Fresh Graduate 2022</span>
          <div
            className="fadingEffect"
            style={{ animationDelay: "5.5s" }}
          ></div>
        </div>
      </div>
    </div>
  );
};

const Home = () => {
  const images = [{
    title: "HTML5",
    src: html5logo
  },{
    title: "CSS",
    src: csslogo
  },
  {
    title: "Javascript",
    src: javascriptlogo
  },
  {
    title: "React.js",
    src: reactlogo
  },
  {
    title: "TailwindCSS",
    src: tailwindlogo
  },
  {
    title: "MYSQL",
    src: mysql_logo
  }
]
  const clickMeBtn = () => {
    document.getElementById("showproj").style.display = "block";
  };

  return (
    <div className=" w-full">
      <div className="header flex flex-col content">
        <div className="text-welcome">
          Welcome to my Portfolio.
          <div className="fadingEffect"></div>
        </div>
        <div className="flex flex-row justify-center relative">
          <div className="relative w-full left-0 right-0">
            <div className="">
              <div  className="text-info">
                Saran Kunsutha (Joe) 
                <br/>
                24 years old
                <div
                  className="fadingEffect"
                  style={{ animationDelay: "1.2s" }}
                ></div>
              </div>
              
            </div>
            <div></div>
            
          </div>
          <div className="flex justify-end px-2 py-4">
            <img
            src={profile_pic}
            className="w-[200px] min-w-[80px] h-auto mt-6 fadein-bottom"
            alt=""
            ></img>
          </div>
          
          
        </div>
        <div className="flex  mt-10 ">
          <p
            className="text-4xl font-bold fadein-top underline"
            style={{ animationDelay: "7.5s" }}
          >
            Skills
          </p>
          <div
            className="flex flex-wrap ml-10 justify-center gap-20 border-solid border-8 border-white rounded-3xl fadein-zoom text-center"
            style={{ animationDelay: "8s" }}
          >
            {/* {images.map((val) => (
              <div className="my-5">
              <img
                src={val.src}
                className="max-w-full h-auto w-32 max-h-32 fadein-top"
                style={{ animationDelay: "8.5s" }}
                alt=""
              ></img>
              <p
                className="text-2xl font-bold fadein-bottom"
                style={{ animationDelay: "8.5s" }}
              >
                {val.title}
              </p>
            </div>
            ))} */}
          </div>
        </div>
        <div className="flex w-full mt-8">
          <div className="flex flex-col">
            <p
              className="text-4xl font-bold fadein-top underline"
              style={{ animationDelay: "15s" }}
            >
              Project
            </p>
            <button
              onClick={clickMeBtn}
              className="text-xl font-bold fadein-top bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-full mt-4"
              style={{ animationDelay: "16s" }}
            >
              Click Me
            </button>
            <IconContext.Provider value={{ size: "4em" }}>
              <div
                id="arrow"
                className="mt-24 fadein-up-arrow"
                style={{ animationDelay: "16.3s" }}
              >
                <ImArrowUp2 />
              </div>
            </IconContext.Provider>
          </div>
          <div
            id="showproj"
            className="flex gap-20 border-solid border-8 border-white rounded-3xl ml-12 py-4 w-4/5 min-w-max fadein-zoom text-center"
            style={{ display: "none" }}
          >
            <p className="text-3xl text-left p-2">
              <span className="font-bold underline underline-offset-8">
                Project Name{" "}
              </span>{" "}
              : A Comparison License Plate Detection and Recognition by using
              Deep Learning
            </p>
            <p className="text-3xl text-left p-2">
              <span className="font-bold underline underline-offset-8">
                Tools{" "}
              </span>{" "}
              : For License Plate Detection - YoloV4 , SSD-Mobilenet <br />
              <span className="pl-24 pt-2">
                For License Plate Reader/Recognition - Google Vision API ,
                EasyOCR
              </span>
            </p>
            <hr className="mt-4" />

            <div className="flex gap-12 mt-2">
              <p className="text-3xl font-bold underline underline-offset-8">
                Example:
              </p>
              <img 
                src={car} 
                className="max-w-full h-auto w-72 max-h-48 " 
                alt=""
              ></img>
              <img
                src={plate}
                className="max-w-full h-auto w-72 max-h-48 "
                alt=""
              ></img>
              <img
                src={result}
                className="max-w-full h-auto w-72 max-h-48 "
                alt=""
              ></img>
              <div className="py-20 px-3">
                <Link
                  to="/portfolio_2"
                  className="text-xl font-bold bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-full mt-4"
                >
                  Go Next
                </Link>
              </div>
              <IconContext.Provider value={{ size: "4em" }}>
                <div id="arrow" className="mt-24 fadein-up-arrow-gonext">
                  <ImArrowUp2 />
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

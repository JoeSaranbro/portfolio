import { useState, useEffect, useRef } from "react";

import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame
} from "framer-motion";

import { wrap } from "@motionone/utils";
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





function ParallaxText({ children, baseVelocity = 100 }) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false
  });

  //on hover && touchstart
  const [isHovered, setIsHovered] = useState(false); // State to track hover state
  const containerRef = useRef(null); // Ref to the parallax container

  // Function to handle mouse hover events
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  // Function to handle touch events on mobile devices
  const handleTouchStart = () => {
    setIsHovered(true);
  };

  const handleTouchEnd = () => {
    setIsHovered(false);
  };


  /**
   * This is a magic wrapping for the length of the text - you
   * have to replace for wrapping that works for you or dynamically
   * calculate
   */
  const x = useTransform(baseX, v => `${wrap(0, -25, v)}%`);

  const directionFactor = useRef(1);
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    /**
     * This is what changes the direction of the scroll once we
     * switch scrolling directions.
     */
    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();

    if (!isHovered) {
      baseX.set(baseX.get() + moveBy);
    }

  });

  /**
   * The number of times to repeat the child text should be dynamically calculated
   * based on the size of the text and viewport. Likewise, the x motion value is
   * currently wrapped between -20 and -45% - this 25% is derived from the fact
   * we have four children (100% / 4). This would also want deriving from the
   * dynamically generated number of children.
   */
  return (
    <div className="parallax"
      ref={containerRef}
      onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}
      >
      <motion.div className="scroller" style={{ x }}>
        <div>{children} </div>
        <div>{children} </div>
        <div>{children} </div>
        <div>{children} </div>
      </motion.div>
    </div>
  );
}







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
      <div className="header flex flex-col content max-w-full ">
        <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.8,
          delay: 0.5,
          ease: [0, 0.71, 0.2, 1.01]
        }}
        
        >
        <div className="text-welcome flex justify-center">
          Hi, welcome to my Portfolio.
          {/* <div className="fadingEffect"></div> */}
        </div>
        </motion.div>
        <div className="flex flex-row justify-center">
          <div className=" w-full">
            <div className="">
            <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              delay: 1,
              duration: 0.6,
              ease: [0, 0.71, 0.2, 1.01],
              scale: {
                type: "spring",
                damping: 5,
                stiffness: 100,
                restDelta: 0.001
              }
            }}
            >
              <div  className="">
                <p className="text-lg sm:text-3xl md:text-5xl lg:text-7xl font-black">Saran Kunsutha (Joe) </p>
                <p className="text-base sm:text-xl md:text-3xl lg:text-5xl font-semibold">24 years old </p>
              </div>
            </motion.div> 
            </div>
            <div></div>
            
          </div>
          <div className="flex justify-end px-2 py-4">
            <img
            src={profile_pic}
            className="w-[200px] min-w-[80px] h-auto mt-6 fadein-bottom rounded-3xl"
            alt=""
            ></img>
          </div>
          
          
        </div>
        <div className="flex flex-col mt-10 w-full overflow-hidden">
          <div className="text-center title-text">
          <p
            className="fadein-top"
            style={{ animationDelay: "7.5s" }}
          >
            Skills, Tools, Stacks.
          </p>
          </div>
          
            
            <ParallaxText baseVelocity={-5}>
              {images.map((val) => (
              <div className="my-5 flex flex-col">
              <img
                src={val.src}
                className="max-w-full h-auto w-32 max-h-32 fadein-top"
                // style={{ animationDelay: "8.5s" }}
                alt=""
              ></img>
              <p
                className="text-2xl font-bold fadein-bottom text-center"
                //style={{ animationDelay: "8.5s" }}
              >
                {val.title}
              </p>
            </div>
            ))}
            </ParallaxText>

          
        </div>
        <div className="flex flex-wrap md:flex-nowrap w-full mt-8">
          <div className="flex flex-col px-2 py-2">
            <p
              className="title-text fadein-top "
              
            >
              Project
            </p>
            <button
              onClick={clickMeBtn}
              className="text-xl font-bold fadein-top bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-full mt-4 w-full"
              //style={{ animationDelay: "16s" }}
            >
              Click Me
            </button>
            <IconContext.Provider value={{ size: "4em" }} >
              <div
                id="arrow"
                className="mt-24 fadein-up-arrow hidden md:block "
                //style={{ animationDelay: "16.3s" }}
              >
                <ImArrowUp2 />
              </div>
            </IconContext.Provider>
          </div>
          <div
            id="showproj"
            className="flex showproject gap-20 border-solid border-8 border-white rounded-3xl fadein-zoom text-left ml-2 px-2 py-2"
            style={{ display: "none" }}
          >
            <p className="">
              <span className="">
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

            <div className="flex flex-wrap gap-12 mt-2 showproject-img">
              <p className="text-3xl font-bold underline underline-offset-8">
                Example:
              </p>
              <img 
                src={car} 
                className="" 
                alt=""
              ></img>
              <img
                src={plate}
                className=""
                alt=""
              ></img>
              <img
                src={result}
                className=" "
                alt=""
              ></img>
              <div className="py-20 px-3">
                <Link
                  to="/portfolio_2"
                  className="text-xl font-bold bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-full mt-4"
                >
                  Go to the next page.
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

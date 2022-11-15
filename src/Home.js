import { useEffect } from 'react';
import { IconContext } from "react-icons";
import { FaArrowRight } from "react-icons/fa";
import  profile_pic  from "./components/profile_pic.jpg";


const Info = () => {
  const name = document.getElementById("name")
  useEffect(() => {
    const timer = setTimeout(() => 
      
    name, 5000);
    return () => clearTimeout(timer);
  }, []);

  

  return (

        <div id="name" className="text-name">Saran Kunsutha (Joe)
          <div className="fadingEffect"></div>
        </div>
          
          
          )
}

const Home = () => {
  return (
    <div className="mx-10">
      <div className="header">
        <div className="text-welcome">Welcome to my Portfolio.
        <div className="fadingEffect"></div>
        </div>
        <div className="flex">
          <IconContext.Provider value={{ size: "4em" }}>
            <div id ="arrow" className="mt-24 fadein-left"><FaArrowRight />
            
            </div>
          </IconContext.Provider>
          <img src={profile_pic} className="w-48 ml-28 mt-6 fadein-bottom "></img>
          <Info/>
          {/* <div className="text-name">Saran Kunsutha (Joe)
          <div className="fadingEffect"></div>
          </div> */}
        </div>
       
      </div>
   
    </div>
  );
};
export default Home;

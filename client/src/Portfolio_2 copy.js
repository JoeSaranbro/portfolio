import React from 'react'
import netsuite_pic from "./components/netsuite.jpg"

//<img src={netsuite_pic} className="max-w-full h-auto w-1/4 min-w-[16rem] my-4 mx-auto"></img> 
const Portfolio_2 = () => {
  return (
    <div className=''>
        <div className='flex flex-wrap '>
            <div className=''>
                <p className='font-bold text-3xl underline'>Experience</p> 
                <div className='border-solid border-8 border-white rounded-2xl mt-4 '>
                    <p className='text-2xl pl-4 '><span className='text-3xl underline font-bold'>Internship:</span> Software Developer at TeibTo</p>
                    <div className='text-xl pl-4 '>
                        <p className='my-2 underline text-balance'>13 January 2022 - 17 May 2022, Do some coding, programming by using html, css, javascript and suitescript to support and help customer's issue. Build function in Oracle Netsuite to create PDF Bill for customer</p>
                        <p className='my-2'></p>
                        <p className='my-2'></p>
                        
                    </div>
                </div>
                
            </div>

            <div className='flex mt-6 w-full'>
                <p className='font-bold text-3xl underline'>More About Me</p> 
                <div className='border-solid border-8 border-white rounded-3xl w-3/5 max-w-full ml-8'>
                    <div className='my-2'>
                        <p className='pl-4'><span className='font-bold text-3xl underline align-top'>What I have been doing: ?</span><span className='inline-block text-xl'> 
                        Currently, I've been studying about react js library as a front-end tool, and I have planned to study about 
                        back-end and database tools as soon as possible.
                        Now I'm looking for opportunities as a web developer. </span> </p>
                    </div>
                    <div className='my-2'>
                        <p className='pl-4'><span className='font-bold text-3xl underline align-top'>Language:</span><span className='inline-block text-2xl'> Thai-Native<br/> English-Intermediate <br/>(TOEIC 635)</span> </p>
                    </div>
                    <div className='my-2'>
                        <p className='pl-4'><span className='font-bold text-3xl underline align-top'>Github:</span><span className='inline-block text-2xl ml-4'> <a href='https://github.com/JoeSaranbro/portfolio/tree/J1' className='text-blue-600 dark:text-blue-500 hover:underline'>github.com/JoeSaranbro/portfolio</a></span> </p>
                        <p className='pl-4 mt-4'><span className='font-bold text-3xl underline align-top'>Contact:</span><span className='inline-block text-2xl ml-4'> Tel. 095-114-9151 <br/>  E-mail: sarankunsutha@gmail.com</span> </p>
                    </div>
                </div>
                
            </div>
        </div>
    </div>
  )
}

export default Portfolio_2
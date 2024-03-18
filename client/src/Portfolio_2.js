import React from 'react'
import netsuite_pic from "./components/netsuite.jpg"

//<img src={netsuite_pic} className="max-w-full h-auto w-1/4 min-w-[16rem] my-4 mx-auto"></img> 
const Portfolio_2 = () => {
  return (
    <div className='content w-full relative'>
        <div className='flex flex-col max-w-[600px] relative '>
            <section className='box relative bg-zinc-800/50 rounded-2xl px-4 py-2'>
                <h1 className=''>Experience.</h1> 
                <div className='pl-4'>
                    <h1 className=''>Internship: Software Developer at TeibTo </h1>
                    <div className=''>
                        <p className=''>13 January 2022 - 17 May 2022, Do some coding, programming by using html, css, javascript 
                        and suitescript to support and help customer's issue. 
                        Build function in Oracle Netsuite to create PDF Bill for customer.</p>
                        <p className='my-2'></p>
                        <p className='my-2'></p>
                        
                    </div>
                </div>
                
            </section>
            <section className='box relative bg-zinc-800/50 rounded-2xl px-4 py-2'>
                <h1 className='whitespace-nowrap '>More About Me.</h1> 
                <div className='pl-4'>
                    <div className=''>
                        <p className=''><h1 className=''>What I have been doing: ?</h1>
                        <span className=''> 
                        Currently, I've been studying about react js library as a front-end tool, and I have planned to study about 
                        back-end and database tools as soon as possible.
                        Now I'm looking for opportunities as a web developer. </span> 
                        </p>
                    </div>
                    <div className='my-2'>
                        <p className=''><h2 className=''>Language:</h2> <span></span>Thai-Native English-Intermediate (TOEIC 635)</p>
                    </div>
                    <div className='my-2'>
                        <p className=''><h2 className=''>Github:</h2><span className=''> <a href='https://github.com/JoeSaranbro/portfolio/tree/J1' className=''>github.com/JoeSaranbro/portfolio</a></span> </p>
                        <p className=' mt-4'><h2 className=''>Contact:</h2>
                        <span className=''> Tel. 095-114-9151 <br/>  E-mail: sarankunsutha@gmail.com</span>
                        </p>
                    </div>
                </div>
                
            </section>
        </div>
    </div>
  )
}

export default Portfolio_2
import React from 'react'
import netsuite_pic from "./components/netsuite.jpg"

//<img src={netsuite_pic} className="max-w-full h-auto w-1/4 min-w-[16rem] my-4 mx-auto"></img> 
const Portfolio_2 = () => {
  return (
    <div className='h-full content'>
        <div className='flex flex-col max-w-[1200px] relative'>
            <section className='flex flex-row gap-6'>
                <div className='box relative bg-zinc-800/50 rounded-2xl px-4 py-2'>
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
                </div>
                <div className='py-2'> <img src={netsuite_pic} className="max-w-[430px] w-full my-4 mx-auto rounded-2xl" alt="oracle netsuite's"></img> </div>
            </section>
            <section className='box relative bg-zinc-800/50 rounded-2xl px-4 py-2'>
                <h1 className=''>More About Me.</h1> 
                <div className='pl-4'>
                    <div className=''>
                        <p className=''><h1 className=''>What I have been doing? </h1>
                        <span className=''> 
                        Currently, I've been studying about react js library as a front-end tool, 
                        and I have been studying about backend-security for website.
                        <br/> <br/>
                        I was a full-time streamer before in 2023 but it turned out not success, so I decided to start a new challenge 
                        as a web-developer. 
                        <br/> <br/>
                        I have an application which I made it's called Todo-list web application which is hosting on vercel.com 
                        and my backend express.js is hosting on AWS EC2 as well as my sql database. <br/> <br/> 
                        More about my application is I have login system which has authentication system using JWT(JSON Web Tokens),
                        and the other way to login is through sign in with google.
                        <br/> <br/> 
                        About register system I have some regex validating as well as login system and using hashed password to store user's password in my sql database.
                        <br/> <br/> 
                        After user successfully signed up, I have email confirmation to send user an email to confirm their sign up.
                        <br/> <br/> 
                        I also have function like forgot password which will send them OTP to their email to verify the user and give them to set their new password.



                        
                         <br/> <br/>
                        Now I'm looking for opportunities as a web developer. </span> 
                        </p>
                    </div>
                    <div className='my-2'>
                        <p className=''><h2 className=''>Language:</h2> Thai-Native English-Intermediate (TOEIC 635) </p>
                    </div>
                    
                    <div className='my-2'>
                        <p className=''><h2 className=''>Github:</h2> <a href='https://github.com/JoeSaranbro/portfolio/tree/J1' className='text-blue-500'>github.com/JoeSaranbro/portfolio</a></p>
                        
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
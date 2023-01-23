import React, { useState, useRef, useEffect} from 'react'


const Test = () => {
  console.count("Test")

  const [data, setData] = useState(0)

    const waters = ["purra", "sigha", "aura", "chang", "sprinkle", "crystal", "aquafina", "contrex", "sta maria"]

    
    const output = [
      {
        "letter": "a",
        "list": ["aquafina","aura"]
      },
      {
        "letter": "c",
        "list": ["chang","contrex","crystal"]
      },
      {
        "letter": "p",
        "list": ["purra"]
      },
      {
        "letter": "s",
        "list": ["sigha","sprinkle","sta maria"]
      }
    ]

    

    // const newArr = output.map(p =>
    //   p.list.find((k,i)=> k === 'aquafina')
    //     ? {...p, list:  p.list.map((data)=> data === 'aquafina' ? "new": data) }
    //     : p
    // );

   // console.log(newArr)


    // const newArr2 = output.map(p =>
    //   p.list.find((k,i)=> k === 'aquafina')
    //     ? {...p, list:  [...p.list,p.list.push("asas")] }
    //     : p
    // );
    
    // console.log(newArr2)

 

    let dict = () => {
      const arr = []

      waters.reduce((a, c) => {

        if (waters.length === 0) {
          return [];
        }

        let k = c[0]
        if (!a[k]) {
         a[k] = {letter: k, list: [c]}
         arr.push(a[k])
        }
        else {
        a[k].list.push(c)
        }
        return a
      }, {})

      return (
          arr
    )
  }

  
     //console.log(dict())

  const newWater = () => {
    const firstLT = waters.map((data)=> data[0])

    const uniq = [...new Set(firstLT.sort())];
    const newObj = {}
    const newAr = []
    
    if (waters.length!==0) {
      for (let i = 0; i < uniq.length; i++) {
        newAr.push({letter: uniq[i], list:[]})
      }
    } 
       newAr.map((list)=> waters.map((data)=> {if (list.letter === data[0]) {
        list.list.push(data)
      }}
      ))

    return newAr
  }
  
      

  const getSections = () => {

    if (waters.length === 0) {
      return [];
    }
    const select = waters.reduce((acc, word,i) => {
        let firstLetter = word[0].toLocaleUpperCase();
        if (!acc[firstLetter]) {
          acc[firstLetter] = { title: firstLetter, data: [word] };
        } else {
          acc[firstLetter].data.push(word);
        }
        return acc;
      }, {}) 
    
    const finalArr = []
      for (const key in select) {
        finalArr.push(select[key])
      }
    

    return (
      finalArr
      )
    
 }
 
 

      const reducePrac = () => {
        let arr = ["a","b",'c','d','e']
        
        arr.reduce((total, curVal,i) => {
          if (curVal === "a") {
            total[curVal] = {letter: [curVal]}
            arr.push(total)
          } else {
            total["a"].letter.push(curVal)
          }
          return total
        },{})
        
        return  arr
      }
      // console.log(reducePrac())

      

      const [test,setTest] = useState(0)
      const numberRef = useRef(0)

      const ACom = () => {
        const [data,setData] = useState(0)
        
        useEffect(() => {
          
          console.log(numberRef.current)
      }, [numberRef])

        console.count("Acom")

        const handleqqq = () => {
          
          setData(prev => prev + 1)
          
        }

        

        return(
          <div>
            <div className='mt-4'>
             Acom =  {data} 
            </div>
            <div>
              <button onClick={handleqqq}> Add</button>
            </div>
            
          </div>
        )

      }
     
      const New = ( props ) => {
        const [num, setNum] = useState(19)

        const click = ( id ) => {

        }
        return(
          <p> {props.data} </p>
        )
      }


      //output = output.push(output.map((data,i) ))
     // output[0].id = 0
      output.map((data,i) => output[i].id = i)

      console.log(output)

      //<New data={numberRef.current} />

      return (
    
        <div className='w-full h-full'>
          Test Component 
          <div>Test = {test}</div>
          <div> <button onClick={() => setTest(prev => prev + 1)} > Add</button></div>
          <div>
          <ACom />
          </div>

          <div className='text-white mt-5'> 
          {output.map((data,i)=> (
            <div>
             <div>{data.letter} <span className='ml-4'> {data.list + " "} </span> 
              <button className='bg-sky-500 hover:bg-sky-700 rounded mt-2' onClick={()=> numberRef.current += 1}> REF ADD</button>
             </div>  
            
            </div>
          ))}
          
            
          </div>
          
          
        </div>
      )

    }
     

    
  


export default Test
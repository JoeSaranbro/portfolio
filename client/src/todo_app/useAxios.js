import  { useState, useEffect } from 'react'
import axios from 'axios'
const useFetch = (url) => {
    const [data, setData] = useState(null)
    const [isLoading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    useEffect(() => {
  
        const fetchAllItems = async () => {
          try {
              const res = await axios.get(url)
              if (res.data.errno) {
                setError("Something went wrong")
              } else {
                setData(res.data);
              }
              
              
          } catch (err) {
              setError(err)
              console.log(error)
          }
        };
        fetchAllItems();
        
      }, [url]);

  return { data, isLoading, error, setError }
}

export default useFetch
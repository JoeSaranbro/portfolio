import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

const Prac_BlogList = ({ blogs }) => {

  //const [data, setData] = useState(blogs);
  console.log()
  // const handleDelete = (id) => {

  //   axios({
  //     method: 'delete',
  //     url: 'http://localhost:8000/blogs/'+  + id,
  //   })

  //   setData(data.filter((data.id) => data.id !== id ))
  //   console.log(data.id)
    
  // }
    return (
      <div className="blog-list">
      {blogs.map(blog => (
        <div className="blog-preview flex" key={blog.id} >
          <Link to={`/blogs/${blog.id}`}>
            <h2>{ blog.title  }</h2>
            <p>Written by { blog.author }</p>
          </Link>
          {/* <div className='ml-auto mr-0 pt-5'> <button onClick={()=> handleDelete(blog.id)}>Delete</button> </div> */}
        </div> 
      ))}
    </div>

    );
  }
   
  export default Prac_BlogList;
import { useParams } from "react-router-dom";
import useAxios from "../useAxios";
import { useNavigate  } from "react-router-dom";
import axios from 'axios'


const Prac_BlogDetails = () => {
  const { id } = useParams();
  const { data: blog, error, isPending } = useAxios('http://localhost:8000/blogs/' + id);

  const navigate = useNavigate();
  
  const handleDelete = () => {
    axios({
      method: 'delete',
      url: 'http://localhost:8000/blogs/'+  + id,
    })
     navigate("/prac_home")
  }
  
  return (
    <div className="prac_container prac_content blog-details">
      { isPending && <div>Loading...</div> }
      { error && <div>{ error }</div> }
      { blog && (
        <article>
          <h2>{ blog.title }</h2>
          <p>Written by { blog.author }</p>
          <div>{ blog.body }</div>
          <button onClick={handleDelete}>Delete</button>
        </article>
      )}
    </div>
  );
}
 
export default Prac_BlogDetails;
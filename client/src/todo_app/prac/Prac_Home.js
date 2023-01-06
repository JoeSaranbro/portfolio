import Prac_BlogList from "./Prac_BlogList";
import useAxios from '../useAxios';

const Prac_Home = () => {
    const { error, isLoading, data: blogs  } = useAxios("http://localhost:8000/blogs")
  return (
    <div className="home">
      { error && <div>{ error }</div> }
      { isLoading && <div>Loading...</div> }
      {blogs && <Prac_BlogList blogs={blogs} />}
    </div>
  );
}

export default Prac_Home
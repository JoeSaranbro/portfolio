import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ( {setUser} ) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(!name);
    if(!name || !email) return;
    setUser({name: name, email: email});
    navigate('/dashboard')
  };

  


  return (
    <div className='flex justify-center absolute top-1/2 left-1/2 -translate-x-1/2 bg-red-700'>
    <section className='section'>
      <form className='form' onSubmit={handleSubmit}>
        <h5>login</h5>
        <div className='form-row'>
          <label htmlFor='name' className='form-label'>
            name
          </label>
          <input
            type='text'
            className='form-input'
            id='name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        </div>
        <button type='submit' className='btn btn-block'>
          login
        </button>
      </form>
    </section>
    </div>
  );
};
export default Login;

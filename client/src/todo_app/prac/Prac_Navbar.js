import { Link } from "react-router-dom";

const Prac_Navbar = () => {
    return (
      <nav className="prac_navbar">
        <h1>The Dojo Blog</h1>
        <div className="links">
        <Link to="/prac_home">Home</Link>
        <Link to="/prac_create" style={{ 
          color: 'white', 
          backgroundColor: '#f1356d',
          borderRadius: '8px' 
        }}>New Blog</Link>
        </div>
        
      </nav>
    );
  }
   
  export default Prac_Navbar;
const Prac_Navbar = () => {
    return (
      <nav className="prac_navbar">
        <h1>The Dojo Blog</h1>
        <div className="links">
          <a href="/">Home</a>
          <a href="/create" style={{ 
            color: 'white', 
            backgroundColor: '#f1356d',
            borderRadius: '8px' 
          }}>New Blog</a>
        </div>
      </nav>
    );
  }
   
  export default Prac_Navbar;
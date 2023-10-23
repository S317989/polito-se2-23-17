import {Link} from 'react-router-dom';

function Header() {
  return (
    <nav class="navbar bg-dark border-bottom border-body">
      <div class="container-md">
        <a class="navbar-brand" href="#">
          Navbar
        </a>
        <Link to='/'>Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/nextCustomer">Next Customer</Link>
        
      </div>
    </nav>
  );
}

export default Header;
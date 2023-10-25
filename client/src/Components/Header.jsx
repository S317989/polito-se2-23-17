import { Link } from "react-router-dom";

function Header() {
  return (
    <nav className="navbar bg-dark border-bottom border-body">
      <div className="container-md">
        <a className="navbar-brand" href="#">
          Navbar
        </a>
        <Link to="/services" style={{color: 'white'}}> Services</Link>

      </div>
    </nav>
  );
}

export default Header;
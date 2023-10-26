<<<<<<< HEAD
import { Nav, Navbar, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Contexts.js";
import AuthenticationAPI from "../APIs/AuhtAPI.jsx";
import {useContext, useEffect, useState} from "react";
=======
import { Link } from "react-router-dom";
>>>>>>> ConfigureCounters-backend

function Header() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  const handleLogoutSubmit = (event) => {
    event.preventDefault();

    AuthenticationAPI.logoutAPI().then(async (response) => {
      const data = await response.json();

      if (response.status === 200) {
        setUser(null);
        navigate("/Login");
      }
    });
  };

  return (
<<<<<<< HEAD
    <Navbar
      collapseOnSelect
      expand="lg"
      bg="dark"
      variant="dark"
      id="header-container"
    >
      <div className="container-md">
        <Navbar.Brand onClick={() => navigate("/")}>Home</Navbar.Brand>
        <Nav className="justify-content-end flex-grow-1 me-auto">
          <Button
            variant="link"
            className={"nav-link"}
            onClick={() => navigate("/new-ticket")}
          >
            New Ticket
          </Button>
          {user ? (
            <Button
              variant="link"
              className={"nav-link"}
              onClick={handleLogoutSubmit}
            >
              Logout
            </Button>
          ) : (
            <Button
              variant="link"
              className={"nav-link"}
              onClick={() => navigate("/Login")}
            >
              Login
            </Button>
          )}
        </Nav>
=======
    <nav className="navbar bg-dark border-bottom border-body">
      <div className="container-md">
        <a className="navbar-brand" href="#">
          Navbar
        </a>
        <Link to="/services" style={{color: 'white'}}> Services</Link>

>>>>>>> ConfigureCounters-backend
      </div>
    </Navbar>
  );
}

export default Header;

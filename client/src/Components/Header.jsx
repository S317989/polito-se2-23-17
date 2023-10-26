import { Nav, Navbar, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Contexts.js";
import AuthenticationAPI from "../APIs/AuhtAPI.jsx";
import {useContext, useEffect, useState} from "react";
import { Link } from "react-router-dom";

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
    <>
    <Navbar
      collapseOnSelect
      expand="lg"
      bg="dark"
      variant="dark"
      id="header-container"
    >
        <Navbar.Brand onClick={() => navigate("/")}>Home</Navbar.Brand>
        <Nav className="justify-content-end flex-grow-1 me-auto">
          <Button
            variant="link"
            className={"nav-link"}
            onClick={() => navigate("/new-ticket")}
          >
            New Ticket
          </Button>
          <Button
            variant="link"
            className={"nav-link"}
            onClick={() => navigate("/services")}
          >
            Services
          </Button>
          <Button
            variant="link"
            className={"nav-link"}
            onClick={() => navigate("/stats")}
          >
            Stats
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
        
    </Navbar>
    </>
  );
}

export default Header;

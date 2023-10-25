import { Nav, Navbar, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  return (
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
          <Button
            variant="link"
            className={"nav-link"}
            onClick={() => navigate("/Login")}
          >
            Login
          </Button>
        </Nav>
      </div>
    </Navbar>
  );
}

export default Header;

import Button from "react-bootstrap/Button";
import { Navigate } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../Contexts.js";
import TicketAPI from "../APIs/TicketAPI.jsx";
import { Dropdown } from "react-bootstrap";

function GetTicketPage() {
  const { user } = useContext(UserContext); // Stores user information
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);

  const handleNewTicketRequest = () => {
    TicketAPI.newTicket(selectedService).then(async (response) => {
      const data = await response.json();

      if (response.status === 200) {
        console.log("Done");
      } else {
        console.log("Error");
      }
    });
  };

  useEffect(() => {
    TicketAPI.getServices().then(async (response) => {
      const data = await response.json();

      if (response.status === 200) {
        setServices(data);
      } else {
        console.log("Error");
      }
    });
  }, []);

  return (
    <>
      {user ? (
        <>
          <h1>Get the ticket Page</h1>
          <Dropdown>
            <Dropdown.Toggle
              className="dropdown-button"
              variant="outline-success"
            >
              {selectedService ? selectedService : "Select a service"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {services ? (
                services.map((service, index) => (
                  <Dropdown.Item
                    key={index}
                    onClick={() => setSelectedService(service.Name)}
                  >
                    {service.Name}
                  </Dropdown.Item>
                ))
              ) : (
                <Dropdown.Item>None</Dropdown.Item>
              )}
            </Dropdown.Menu>
          </Dropdown>
          <Button
            type="submit"
            size="lg"
            variant="outline-primary"
            className="float-end"
            id="login-button"
            onClick={handleNewTicketRequest}
          >
            Try me!
          </Button>
        </>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
}

export default GetTicketPage;

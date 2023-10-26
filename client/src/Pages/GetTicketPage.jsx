import Button from "react-bootstrap/Button";
import { Navigate } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../Contexts.js";
import TicketAPI from "../APIs/TicketAPI.jsx";

function GetTicketPage() {
  const { user } = useContext(UserContext); // Stores user information

  const handleNewTicketRequest = () => {
    TicketAPI.newTicket().then(async (response) => {
      const data = await response.json();

      if (response.status === 200) {
        console.log("Done");
      } else {
        console.log("Error");
      }
    });
  };

  return (
    <>
      {user ? (
        <>
          <h1>Get the ticket Page</h1>
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

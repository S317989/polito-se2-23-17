import Button from "react-bootstrap/Button";
import TicketAPI from "../APIs/TicketAPI.jsx";

function GetTicketPage() {
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
  );
}

export default GetTicketPage;

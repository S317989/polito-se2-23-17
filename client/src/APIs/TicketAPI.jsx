const parentURL = 'http://localhost:3000/api';

const TicketAPI = {
  newTicket: function () {
    const url = new URL(parentURL + "/ticket/new-ticket");

    console.log("Request received")
    return fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
  },
};

export default TicketAPI;

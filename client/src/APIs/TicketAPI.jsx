const parentURL = "http://localhost:3000/api";

const TicketAPI = {
  newTicket: function (selectedService) {
    const url = new URL(parentURL + "/ticket/new-ticket/");

    url.searchParams.append('service', selectedService);

    return fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
  },
  getServices: function () {
    const url = new URL(parentURL + "/ticket/get-services");

    return fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
  },
};

export default TicketAPI;

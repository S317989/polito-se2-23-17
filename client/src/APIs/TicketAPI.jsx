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

  callNext: async function () {
    const response = await fetch(`${parentURL}/ticket/callNext`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          "CounterId": 4,
          "OfficerId": 2
        }),
        credentials: 'include'
      }
    );
    if (!response.ok) {
      throw new Error('Error calling the next customer')
    }
    console.log(response);
    return await response.json();
  }
};

export default TicketAPI;

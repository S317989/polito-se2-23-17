const parentURL = 'http://localhost:3000/api';

const ServiceAPI = {
  getServiceList: function () {
    const url = new URL(parentURL + "/services/getslist");

    console.log("Request received")
    return fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
  },
};

export default ServiceAPI;

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

  addNewService: function (name, ast) {
    const url = new URL(parentURL + "/services/newservice");

    console.log("Request received")
    return fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: {
        name: name,
        ast: ast,

      },
    });
  },

  updateService: function (ast) {
    const url = new URL(parentURL + "/services/updateservice");

    console.log("Request received")
    return fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: {
        ast: ast
      },
    });
  },

  deleteService: function (id) {
    const url = new URL(parentURL + "/services/deleteservice");

    console.log("Request received")
    return fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: {
        id: id
      },
    });
  },
  
  //APIs services for a given counters , i use params here
  getServiceListByCounter: function (counterId) {
    const url = new URL(parentURL + `/services/${counterId}`);

    console.log("Request received")
    return fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
  },

  addNewServiceCounter: function (counterId, serviceId) {
    const url = new URL(parentURL + `/services/${counterId}/${serviceId}`);
//i use params here
    console.log("Request received")
    return fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
     
    });
  },

  deleteService: function (counterId, serviceId) {
    const url = new URL(parentURL + `/services/${counterId}/${serviceId}`);

    console.log("Request received")
    return fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
     
    });
  },

};





export default ServiceAPI;

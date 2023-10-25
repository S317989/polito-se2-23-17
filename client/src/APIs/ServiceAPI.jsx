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
};

export default ServiceAPI;

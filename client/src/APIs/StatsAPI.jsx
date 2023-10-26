const parentURL = 'http://localhost:3000/api';

const StatsAPI = {
  getServiceTypeStats: function (timePeriod) {
    const url = new URL(parentURL + `/stats/service-type/${timePeriod}`);

    console.log("Request received");
    return fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
  },

  getCounterServiceStats: function (timePeriod) {
    const url = new URL(parentURL + `/stats/counter-service/${timePeriod}`);

    console.log("Request received");
    return fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
  },
};

  
export default StatsAPI;

import React, { useState, useEffect } from 'react';
import StatsAPI from '../APIs/StatsAPI.jsx';

function StatsPage() {
  const [timePeriod, setTimePeriod] = useState('day');
  const [serviceTypeStats, setServiceTypeStats] = useState([]);
  const [counterServiceStats, setCounterServiceStats] = useState([]);

  const handleTimePeriodChange = (event) => {
    setTimePeriod(event.target.value);
  };

  useEffect(() => {
    // Fetch statistics based on the selected time period
    const fetchStats = async () => {
      try {
        const response1 = await StatsAPI.getServiceTypeStats(timePeriod);
        setServiceTypeStats(response1.stats);

        const response2 = await StatsAPI.getCounterServiceStats(timePeriod);
        setCounterServiceStats(response2.stats);
      } catch (error) {
        console.error('Error fetching statistics:', error);
      }
    };

    fetchStats();
  }, [timePeriod]);

  return (
    <>
      <h1>Stats Page</h1>

      <div>
        <label htmlFor="timePeriod">Select Time Period:</label>
        <select id="timePeriod" value={timePeriod} onChange={handleTimePeriodChange}>
          <option value="day">Day</option>
          <option value="week">Week</option>
          <option value="month">Month</option>
        </select>
      </div>

      <h1>Stats Page</h1>

<h2>Service Type Stats</h2>
<table>
  <thead>
    <tr>
      <th>Service Name</th>
      <th>Total Served</th>
    </tr>
  </thead>
  <tbody>
    {serviceTypeStats.map(stat => (
      <tr key={stat.serviceName}>
        <td>{stat.serviceName}</td>
        <td>{stat.totalServed}</td>
      </tr>
    ))}
  </tbody>
</table>

<h2>Counter Service Stats</h2>
<table>
  <thead>
    <tr>
      <th>Counter Name</th>
      <th>Service Name</th>
      <th>Total Served</th>
    </tr>
  </thead>
  <tbody>
    {counterServiceStats.map(stat => (
      <tr key={`${stat.counterName}-${stat.serviceName}`}>
        <td>{stat.counterName}</td>
        <td>{stat.serviceName}</td>
        <td>{stat.totalServed}</td>
      </tr>
    ))}
  </tbody>
</table>
    </>
  );
}

export default StatsPage;

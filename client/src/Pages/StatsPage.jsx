import React, { useState, useEffect } from 'react';
import StatsAPI from '../APIs/StatsAPI.jsx';
import { Container, Row, Col, Table, Form } from 'react-bootstrap';

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
        StatsAPI.getServiceTypeStats(timePeriod).then(async (response) => {
          setServiceTypeStats(await response.json());
        });
        StatsAPI.getCounterServiceStats(timePeriod).then(async (response) => {
          setCounterServiceStats(await response.json());
        });
      } catch (error) {
        console.error('Error fetching statistics:', error);
      }
    };

    fetchStats();
  }, [timePeriod]);

  return (
    <Container>
      <h1 className="mt-4">Stats Page</h1>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formTimePeriod">
          <Form.Label>Select Time Period:</Form.Label>
          <Form.Control as="select" value={timePeriod} onChange={handleTimePeriodChange}>
            <option value="day">Day</option>
            <option value="week">Week</option>
            <option value="month">Month</option>
          </Form.Control>
        </Form.Group>
      </Row>

      <Row>
        <Col>
          <h2>Service Type Stats</h2>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Service Name</th>
                <th>Total Served</th>
              </tr>
            </thead>
            <tbody>
            {Array.isArray(serviceTypeStats) && serviceTypeStats.map(stat => (
            <tr key={stat.serviceName}>
              <td>{stat.serviceName}</td>
              <td>{stat.totalServed}</td>
            </tr>
  ))}
            </tbody>
          </Table>
        </Col>

        <Col>
          <h2>Counter Service Stats</h2>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Counter Name</th>
                <th>Service Name</th>
                <th>Total Served</th>
              </tr>
            </thead>
            <tbody>
            {Array.isArray(counterServiceStats) && counterServiceStats.map(stat => (
            <tr key={`${stat.counterName}-${stat.serviceName}`}>
              <td>{stat.counterName}</td>
              <td>{stat.serviceName}</td>
              <td>{stat.totalServed}</td>
            </tr>
  ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
}

export default StatsPage;

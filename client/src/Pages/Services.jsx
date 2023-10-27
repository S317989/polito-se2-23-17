import { Container, Col, Row, Button } from 'react-bootstrap';
import Pagination from 'react-bootstrap/Pagination';
import ListGroup from 'react-bootstrap/ListGroup';
import ServiceAPI from '../APIs/ServiceAPI';
import { useEffect, useState } from 'react';

function Services() {
  const counter = [1, 2, 3, 4];
  const [active, setActive] = useState(1); //initial value counter
  const [show, setShow] = useState(true);
  const [clist, setClist] = useState([]);
  const [slist, setSlist] = useState([]);
  const [errorMsg, setErrorMsg] = useState();
  const [sname, setSname] = useState("insert service name");
  const [ast, setAst]=useState("insert average service time");

  const handlelistService = async () => {
    try {
      const response = await ServiceAPI.getServiceList();
      const data = await response.json();
      if (response.status === 200) {
        setSlist(data);
      } else {
        console.log('Error fetching services');
      }
    } catch (error) {
      console.error('Error fetching services list: ', error);
    }
  };

  const handleNewService = async ()=>{
    try{
        
        const response = await ServiceAPI.addNewService(sname, ast);
        

    }catch(error) {
        console.error('error creating new service: ', error)
    }
  }

  const handleCounterServices = (cId) => {
    ServiceAPI.getServiceListByCounter(cId).then(async (response) => {
      const data = await response.json();
      if (response.status === 200) {
        const counterlist = data.map((e) => ({ id: e.id, name: e.name, ast: e.ast }));
        setClist(counterlist);
      } else {
        console.log('Error');
      }
    });
  };

  useEffect(() => {
    // Fetch services when the component mounts
    handlelistService();
    handleCounterServices(active);
  }, []); // Empty dependency array ensures this effect runs only once

  return (
    <>
      <Container>
        <Row>
          <Button onClick={handlelistService}>Show all services</Button>

          <Col>
            <ListGroup as="ul">
              {slist.length > 0 ? (
                slist.map((e) => (
                
                  <ListGroup.Item as="li" key={e.id}>
                    {e.name} with Average Service Time: {e.ast}
                    <Button> Add to the current counter {active}</Button> 
                    <Button> Edit service</Button> 
                    <Button> Delete service</Button> 
                  </ListGroup.Item>
                 
                ))
              ) : (
                <h3>Services not available</h3>
              )}
            </ListGroup>

         <form onSubmit={(e) => {
            e.preventDefault(); // Prevent the default form submission behavior
            handleNewService();
            handlelistService();
        }}>
            <input type="text" placeholder={sname} onChange={(e) => {
            setSname(e.target.value);
            }} />
            <input type="text" placeholder={ast} onChange={(e) => {
                if(isNaN(+e.target.value)) //is a number true
                    setAst(e.target.value);
                else setErrorMsg("Invalid input. Use numbers!");
            }
            } />
            <Button type="submit">Create new service</Button>
        </form>
            
          </Col>

          <Col>
            <Row>
              <Pagination>
                {counter.map((e) => (
                  <Pagination.Item
                    key={e}
                    active={e === active}
                    onClick={() => {
                      setActive(e);
                      handleCounterServices(e);
                    }}
                  >
                    Counter {e}
                  </Pagination.Item>
                ))}
              </Pagination>
            </Row>
            <Row>
              <ListGroup as="ul">
                {clist.length > 0 ? (
                  clist.map((e) => (
                    <ListGroup.Item as="li" key={e.id}>
                      {e.name} with Average Service Time: {e.ast}
                      <Button>Remove service</Button>
                    </ListGroup.Item>
                  ))
                ) : (
                  <h3>Couldn't retrieve services</h3>
                )}
              </ListGroup>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Services;

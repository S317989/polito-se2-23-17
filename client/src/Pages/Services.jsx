import {Container, Col, Row, ListGroupItem} from 'react-bootstrap';
import Pagination from 'react-bootstrap/Pagination';
import ListGroup from 'react-bootstrap/ListGroup';
import ServiceAPI from '../APIs/ServiceAPI';
import { useState } from 'react';

function Services() {

   const [counter, setCounter]=useState(1);
   const [conterslist, setCounterslist]=useState();

  
  
    const getlistService = () => {
      ServiceAPI.getServiceList().then(async (response) => {
        const data = await response.json();
  
        if (response.status === 200) {
          const sList=data.map((i)=>{id: i.Id, name: i.Name, ast: i.ast});
          setCounterslist(sList);
        } else {
          console.log("Error");
        }
      });
    };
    

    return (
        <>
        <Container>
            <Row>
            <Col>
                 <ListGroup as="ul">
                {
                    counterslist ?
                    counterslist.map((e)=><ListGroup.Item as='li' key={e.id}  >{e.name} with Average Service Time: {e.ast}</ListGroup.Item>)
                    :
                    <h3>Services not available</h3>
                }
            
            </ListGroup>

            </Col>
            <Col>
                    <Pagination.Item key={number} active={number === active}>
                    {number}
                    </Pagination.Item>,
        
            </Col>
                
           
            </Row>
        </Container>
            
        </>
    );
}

export default Services;
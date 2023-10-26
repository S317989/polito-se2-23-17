import {Container, Col, Row, ListGroupItem} from 'react-bootstrap';
import Pagination from 'react-bootstrap/Pagination';
import ListGroup from 'react-bootstrap/ListGroup';
import ServiceAPI from '../APIs/ServiceAPI';
import { useState } from 'react';

function Services() {

   const counter=[1,2,3,4]; //counter is a fixed number
   const [active, setActive]=useState(1);
   
   const [slist, setSlist]=useState();

  
  
    const getlistService = () => {
      ServiceAPI.getServiceList().then(async (response) => {
        const data = await response.json();
  
        if (response.status === 200) {
          const sList=data.map((i)=>{id: i.Id, name: i.Name, ast: i.ast});
          setSlist(sList);
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
            {
                counter.map((e)=><Pagination.Item key={e} active={e === active} onClick={()=>setActive(e)} >
                Counter {e}
                </Pagination.Item>)
            }
        
            </Col>
                
           
            </Row>
        </Container>
            
        </>
    );
}

export default Services;
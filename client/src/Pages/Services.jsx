import {Container, Col, Row} from 'react-bootstrap';
import Pagination from 'react-bootstrap/Pagination';
import ListGroup from 'react-bootstrap/ListGroup';
import { useState } from 'react';

function Services() {

   const [counter, setCounter]=useState(1);
   const [conterslist, setCounterslist]=useState()
    

    return (
        <>
        <Container>
            <Row>
            <Col>
                 <ListGroup as="ul">
            <ListGroup.Item as="li" disabled="true">
             Cras justo odio
             </ListGroup.Item>
            <ListGroup.Item as="li">Dapibus ac facilisis in</ListGroup.Item>
              <ListGroup.Item as="li" disabled>
             Morbi leo risus
            </ListGroup.Item>
            <ListGroup.Item as="li">Porta ac consectetur ac</ListGroup.Item>
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
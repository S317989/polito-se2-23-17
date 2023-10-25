import {Container, Column, Row} from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';

function Services() {
    return (
        <>
        <Container>
            <Row>
                
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

            </Row>
        </Container>
            
        </>
    );
}

export default Services;
import {Card, Container, Button, Row, Col} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';



function CallNextCustomer(props){

    return (
        <Container className='container_center myBG' >
           <Row className="border" border="primary">
            <Row className="d-flex align-items-center justify-content-center"><h2>Next Customers</h2></Row>
                <Row className="bg-primary center_content">
                        <Col> 
                        <p>Counter Number </p>
                        </Col>

                        <Col>
                        <p> Customer Number</p>
                        </Col>
                </Row>
                    {props.counters.map ( (counter) => <RowOfNumberAndCounter key={counter} updateCustomers ={props.updateCustomers} number={props.number[props.counters.indexOf(counter)]} counter={counter}/>)}
           </Row>
      </Container>
       );
}

function RowOfNumberAndCounter(props){

    

    return(
        <>
        <Row>
            <Col> {props.counter} </Col>
            <Col> {props.number} </Col>
            <hr></hr>
        </Row>

        {/* <Button onClick={()=> props.updateCustomers(props.counter-1)}>update </Button> */}

        </>
        
    );
}

export default CallNextCustomer;
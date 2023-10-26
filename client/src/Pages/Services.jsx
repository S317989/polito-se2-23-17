import {Container, Col, Row} from 'react-bootstrap';
import Pagination from 'react-bootstrap/Pagination';
import ListGroup from 'react-bootstrap/ListGroup';
import ServiceAPI from '../APIs/ServiceAPI';
import { useEffect, useState } from 'react';

function Services() {

   const counter=[1,2,3,4]; //counter is a fixed number
   const [active, setActive]=useState(1);
   const [clist, setClist]=useState();
   
   const [slist, setSlist]=useState();



    

    const handlelistService = () => {
      ServiceAPI.getServiceList().then(async (response) => {
        const data = await response.json();
  
        if (response.status === 200) {
            const sList = data.map((i) => ({ id: i.id, name: i.name, ast: i.ast }));

          setSlist(sList);
        } else {
            
          console.log("Error");
        }
      });
    };

      useEffect(
    ()=>{
        handlelistService();
    }
    ,[] )
    
    const handleCounterServices = (cId)=>{

        ServiceAPI.getServiceListByCounter(cId).then(async (response)=>{
            const data = await response.json;
            if(response.status ===200) {
                const counterlist = data.map((e) => ({ id: e.id, name: e.name, ast: e.ast }));

                setClist(counterlist);
            }
            else {
                console.log("error")
            }
        })
    }

    return (
        <>
        <Container>
            <Row>
            <Col>
                 <ListGroup as="ul">
                {
                    slist ?
                    slist.map((e)=><ListGroup.Item as='li' key={e.id}> {e.name} with Average Service Time: {e.ast}</ListGroup.Item>)
                    :
                    <h3>Services not available</h3>
                    
                }
            
            </ListGroup>

            </Col>
            <Col>
            <Row>
            {
                counter.map((e)=><Pagination.Item key={e} active={e === active} onClick={()=>{
                    setActive(e);
                    handleCounterServices(e);
                    
                    }} >
                Counter {e}
                </Pagination.Item>)
                
            }
            </Row>
            <Row>
            <ListGroup as="ul">
            {   
                 clist ? //dovrebbe aggiornarsi in automatico
                    clist.map((e)=><ListGroup.Item as='li' key={e.id} >{e.name} with Average Service Time: {e.ast}</ListGroup.Item>)
                :
                <h3>Couldn't retrieve services</h3>
            
            }   
            </ListGroup>
            </Row>
            </Col>
                
           
            </Row>
        </Container>
            
        </>
    );
}

export default Services;
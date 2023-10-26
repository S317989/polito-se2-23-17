import {Container, Col, Row, Button} from 'react-bootstrap';
import Pagination from 'react-bootstrap/Pagination';
import ListGroup from 'react-bootstrap/ListGroup';
import ServiceAPI from '../APIs/ServiceAPI';
import { useEffect, useState } from 'react';

function Services() {

   const counter=[1,2,3,4]; //counter is a fixed number
   const [active, setActive]=useState(1);
   const [show, setShow]=useState(true);
   const [clist, setClist]=useState();
   
   const [slist, setSlist]=useState();




    const handlelistService = async () => {
        let data= await ServiceAPI.getServiceList()
        .then((res)=>{
            console.log(res)
            return res;
        })
        .catch((err)=>console.log(err));
       return data;
    };
    


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
                
                    
                    <Button onClick={()=>{
                         let res=  handlelistService();
                       console.log(res)
                        
                    }} > Show all services</Button>
                    

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
                <Pagination>
            {
                counter.map((e)=><Pagination.Item key={e} active={e === active} onClick={()=>{
                    setActive(e);
                    handleCounterServices(e);
                    
                    }} >
                Counter {e}
                </Pagination.Item>)
                
            }
            </Pagination>
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
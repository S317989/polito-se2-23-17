import {Button, Container , Form, FormGroup} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

function LoginForm() {
    return (
    <Container className='container_center myBG'>

      
      <Form className='border'>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
          <Form.Text className="text-muted">
            
          </Form.Text>
        </Form.Group>
  
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        
        <FormGroup className='button-center'>
            <Button className = 'my-button' variant="primary" type="submit">
            Login
            </Button>
            
            <Button className='my-button' variant="primary">
            SignUp
            </Button>
            </FormGroup>
      </Form>
    </Container>
    );
  }
  
  export default LoginForm;
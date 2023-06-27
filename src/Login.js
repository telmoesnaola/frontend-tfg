import * as React from 'react';
import Button from 'react-bootstrap/Button';
import  Form  from 'react-bootstrap/Form';
import { Container, Row, Col, Card, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import { useState } from 'react';

const LoginForm = () =>{

  const [show, setShow] = useState(false);

  const navigate = useNavigate();
  const emailRef = React.useRef();
  const passwordRef = React.useRef();

  const handleSubmit = (event) => {
      event.preventDefault();

      const email = emailRef.current.value;
      const password = passwordRef.current.value;

      axios.post('https://64qukh2m3d.execute-api.eu-west-1.amazonaws.com/Prod/login', {
          "email": email,
          "password": password
      }).then((res)=>{
          if (res.status === 200){
              Cookies.set("authToken", res.data.token, 7);
              Cookies.set("username", res.data.username, 7);
              navigate("/home");          
              window.location.reload(false);
          }
      }).catch((err)=>{
        setShow(true)
          console.log(err.message);
      })
  }


  return (
    <Container fluid className='p-3'>
      <Alert show={show} variant="danger" onClose={()=>setShow(false)} dismissible >
        <Alert.Heading>Something went wrong!</Alert.Heading>
        <p>Check your email or/and password</p>
      </Alert>
      <Row className='d-flex justify-content-center align-items-center h-100'>
        <Col md={12}>
          <Card className='bg-dark text-white my-5 mx-auto' style={{borderRadius: '1rem', maxWidth: '400px'}}>
            <Card.Body className='p-5 d-flex flex-column align-items-center mx-auto w-100'>
              <div className='form-div '>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" ref={emailRef}/>
                    <Form.Text className="text-muted">
                      We'll never share your email with anyone else.
                    </Form.Text>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" ref={passwordRef}/>
                  </Form.Group>
                  <Container className='text-center'>
                    <Button  variant="primary" type="submit">
                      Submit
                    </Button>
                  </Container>
                </Form>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
      
    );
}

export default LoginForm;
import * as React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { Container, Row, Col, Card, Alert } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

const SubmitJobForm = () =>{

  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const nameRef = React.useRef();
  const parameterRef = React.useRef();

  useEffect(()=>{
    if (Cookies.get("authToken")==null){
        navigate("/login");
    }
  })

  const handleSubmit = (event) => {
      event.preventDefault();

      const jobName = nameRef.current.value;
      const jobParameter = parameterRef.current.value;
      axios.post('https://64qukh2m3d.execute-api.eu-west-1.amazonaws.com/Prod/submitjob', {
          "jobName": jobName,
          "test": jobParameter
      } ,{
          "headers":{
              "AuthorizationToken1": Cookies.get("authToken")
          }            
      }).then((res)=>{
          if (res.status === 200){
              console.log(res)
              console.log("Job Submitted");
              navigate("/myjobs");
          }
      }).catch((err)=>{
        setShow(true)
          console.log(err.message);
      })
  }


  return (
    <Container fluid>
      <Alert show={show} variant="danger" onClose={()=>setShow(false)} dismissible >
        <Alert.Heading>Something went wrong!</Alert.Heading>
        <p>The Job Name cannot have spaces.</p>
      </Alert>
      <Row className='d-flex justify-content-center align-items-center h-100'>
        <Col md={12}>
          <Card className='bg-dark text-white my-5 mx-auto' style={{borderRadius: '1rem', maxWidth: '600px'}}>
            <Card.Body className='p-5 d-flex flex-column align-items-center mx-auto w-80'>
              <div className='form-div '>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="formJobName">
                    <Form.Label>Job Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter job name" ref={nameRef}/>
                    <Form.Text className="text-muted">
                        The Job Name cannot have spaces.
                    </Form.Text>
                  </Form.Group>
          
                  <Form.Group className="mb-3" controlId="formJobParameter">
                    <Form.Label>Parameter</Form.Label>
                    <Form.Control type="text" placeholder="Enter parameter" ref={parameterRef}/>
                  </Form.Group>
                  <Container className='text-center'>
                    <Button variant="primary" type="submit">
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

export default SubmitJobForm;
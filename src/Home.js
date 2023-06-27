import {Card, Row, Container} from 'react-bootstrap';
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';

const Home = ()=>{

    const navigate = useNavigate();
    console.log(Cookies.get("authToken"))
    console.log(Cookies.get("username"))

    useEffect(()=>{
        if (Cookies.get("authToken")==null){
            navigate("/login");
        }
    })
    

    return (
        <Container>
            <Row className='d-flex justify-content-center align-items-center' >
                <Card bg="dark" className='bg-dark text-white my-5 p-1' style={{borderRadius: '1rem', maxWidth: '48%'}}>
                    <Card.Body className='d-flex flex-column align-items-center mx-auto w-100'>
                        <iframe src="http://localhost:3000/dashboard-solo/new?orgId=1&panelId=4" width="100%" height="300" style={{borderRadius: '1rem',}}></iframe>
                    </Card.Body>
                </Card>
                <Card bg="dark" className='bg-dark text-white my-5 p-1' style={{borderRadius: '1rem', maxWidth: '48%'}}>
                    <Card.Body className='d-flex flex-column align-items-center mx-auto w-100'>
                        <iframe src="http://localhost:3000/d-solo/EyGvPlL4z/apicount?orgId=1&panelId=123125" width="100%" height="300" style={{borderRadius: '1rem',}}></iframe> 
                    </Card.Body>
                </Card>
            </Row>
            <Row className='d-flex justify-content-center align-items-center'>
                <Card bg="dark" className='bg-dark text-white my-5' style={{borderRadius: '1rem', maxWidth: '48%'}}>
                    <Card.Body className='d-flex flex-column align-items-center mx-auto w-100'>
                        <iframe src="http://localhost:3000/d-solo/EyGvPlL4z/apicount?orgId=1&panelId=123127" width="100%" height="300" style={{borderRadius: '1rem',}}></iframe>
                    </Card.Body>
                </Card>
                <Card bg="dark" className='bg-dark text-white my-5' style={{borderRadius: '1rem', maxWidth: '48%'}}>
                    <Card.Body className='d-flex flex-column align-items-center mx-auto w-100'>
                        <iframe src="http://localhost:3000/d-solo/EyGvPlL4z/apicount?orgId=1&panelId=123129" width="100%" height="300" style={{borderRadius: '1rem',}}></iframe>
                    </Card.Body>
                </Card>
            </Row>
        </Container>
    )
}

export default Home
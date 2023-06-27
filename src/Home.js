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
                        <iframe src="http://ec2-34-251-157-57.eu-west-1.compute.amazonaws.com:3000/d-solo/cdedc882-8652-49e6-bd4e-34b9d15518c2/home?orgId=1&from=1685283099897&to=1687875099897&panelId=123124" width="100%" height="300" style={{borderRadius: '1rem',}}></iframe>
                    </Card.Body>
                </Card>
                <Card bg="dark" className='bg-dark text-white my-5 p-1' style={{borderRadius: '1rem', maxWidth: '48%'}}>
                    <Card.Body className='d-flex flex-column align-items-center mx-auto w-100'>
                        <iframe src="http://ec2-34-251-157-57.eu-west-1.compute.amazonaws.com:3000/d-solo/f733625e-78e6-4aec-b689-307ae7bb3190/homekyg?orgId=1&from=1685284324192&to=1687876324192&panelId=123124" width="100%" height="300" style={{borderRadius: '1rem',}}></iframe> 
                    </Card.Body>
                </Card>
            </Row>
            <Row className='d-flex justify-content-center align-items-center'>
                <Card bg="dark" className='bg-dark text-white my-5' style={{borderRadius: '1rem', maxWidth: '48%'}}>
                    <Card.Body className='d-flex flex-column align-items-center mx-auto w-100'>
                        <iframe src="http://ec2-34-251-157-57.eu-west-1.compute.amazonaws.com:3000/d-solo/cdedc882-8652-49e6-bd4e-34b9d15518c2/home?orgId=1&from=1685284380371&to=1687876380371&panelId=123125" width="100%" height="300" style={{borderRadius: '1rem',}}></iframe>
                    </Card.Body>
                </Card>
                <Card bg="dark" className='bg-dark text-white my-5' style={{borderRadius: '1rem', maxWidth: '48%'}}>
                    <Card.Body className='d-flex flex-column align-items-center mx-auto w-100'>
                        <iframe src="http://ec2-34-251-157-57.eu-west-1.compute.amazonaws.com:3000/d-solo/cdedc882-8652-49e6-bd4e-34b9d15518c2/home?orgId=1&from=1685284401085&to=1687876401085&panelId=123126" width="100%" height="300" style={{borderRadius: '1rem',}}></iframe>
                    </Card.Body>
                </Card>
            </Row>
        </Container>
    )
}

export default Home
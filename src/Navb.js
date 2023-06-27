import { Navbar } from "react-bootstrap";
import { Nav } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { Button } from 'react-bootstrap';
import logo from "./Multiverse-Logo.png";
import Cookies from 'js-cookie';

const Navb = () =>{

    const handleClick = () => {
        Cookies.remove("authToken");
        window.location.reload(false);
    }

    if(Cookies.get("authToken")){
        return(
            <Navbar bg="dark" variant="dark" className="rounded-pill ">
                <Container>
                    <Navbar.Brand href="/home">
                        <img 
                            src={logo}
                            width={70}
                            className="d-inline-block align-top"
                            alt="Multiverse Computing Logo"
                        />
                    </Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="/home">Home</Nav.Link>
                        <Nav.Link href="/submitjob">Submit Job</Nav.Link>
                        <Nav.Link href="/myjobs">My Jobs</Nav.Link>
                    </Nav>
                    <Nav className="outline-danger">
                        <Nav.Link className="d-flex text-white" href="#" variant="light" disabled>
                            {Cookies.get("username")}
                        </Nav.Link>
                    </Nav>
                    <Button onClick={handleClick} href="/login" variant="light">Sign Out</Button>
                </Container>
            </Navbar>
        )
    }else{
        return(
            <Navbar bg="dark" variant="dark" className="rounded-pill">
                <Container>
                    <Navbar.Brand href="/login">
                        <img 
                            src={logo}
                            width={70}
                            className="d-inline-block align-top"
                            alt="Multiverse Computing Logo"
                        />
                    </Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="/login">Home</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        )
    }
    
}

export default Navb
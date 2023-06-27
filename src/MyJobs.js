import Cookies from 'js-cookie';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { Button, Container, Row, Col, Pagination } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import loadingGif from './Lightness_rotate_36f_cw.gif';

const MyJobs = () => {
    const navigate = useNavigate();
    const [state, setState] = useState({
        data: [],
        jobs: [],
        active: 1,
        numPages: 0,
        pages: []
    })
    const [isLoading, setLoading] = useState(true)
    const numJobsPerPage= 7;
    var indOfLastEpi = state.active * numJobsPerPage;
    var indOfFirstEpi = indOfLastEpi - numJobsPerPage;

    const Loading = ({isLoading})=>{
        if (isLoading){
            return (<img src={loadingGif} width="10%" alt='Loading...'></img>);
        }
    }

    const calcPages = (data) =>{
        let pages = [];
        for(let i = 1; i <=(Math.ceil(data.length / numJobsPerPage)); i++){
            pages.push(
                <Pagination.Item
                key={i}
                onClick={()=> {
                    pagination(i);
                }}
                >
                    {i}
                </Pagination.Item>
            )
        }
        console.log(pages)
        return pages;
    }

    const pagination = (number) =>{
        indOfLastEpi = number * numJobsPerPage;
        indOfFirstEpi = indOfLastEpi - numJobsPerPage;
        console.log(state)
        setState((prev) => ({
            ...prev,
            active: number,
            jobs: state.data.slice(indOfFirstEpi, indOfLastEpi),
            pages: calcPages(state.data),
            
        }));
    }

    const calcNumberOfPages = async (data) => {
        const pages = await calcPages(data);
        console.log(pages)
        setState((prev) => ({
            ...prev,
            data: data,
            jobs: data.slice(0, numJobsPerPage),
            numPages: Math.ceil(data.length / numJobsPerPage),
            pages: pages
        }));

    }


    useEffect(()=>{
        if (Cookies.get("authToken")==null){
            navigate("/login");
        }

        axios.get('https://64qukh2m3d.execute-api.eu-west-1.amazonaws.com/Prod/user_jobs', {
        "headers":{
            "AuthorizationToken1": Cookies.get("authToken")
        }
        }).then((res)=>{
            if(res.status===200){
                calcNumberOfPages(res.data.jobIds);
                setLoading(false)
            }
        }).catch((err)=>{
            console.log(err.message);
        });
    }, [] )

    const getResults = (id)=>{
        axios.get('https://64qukh2m3d.execute-api.eu-west-1.amazonaws.com/Prod/results?jobId='+id, {
        "headers":{
            "AuthorizationToken1": Cookies.get("authToken")
        }
        }).then((res)=>{
            if (res.status === 200){
                exportData(res.data);
            }
        }).catch((err)=>{
            console.log(err.message);
        });

        const exportData = (d) => {
            const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
              JSON.stringify(d, id)
            )}`;
            const link = document.createElement("a");
            link.href = jsonString;
            link.download = id+".json";
        
            link.click();
        };
    }

    return(
        <div className='p-5'>
            <Card>
                <ListGroup>
                    <ListGroup.Item disabled>
                        <Container>
                            <Row>
                                <Col sm={8}>
                                    <Row>
                                        <Col>Job Name</Col>
                                        <Col>Created At</Col>
                                    </Row>
                                </Col>
                                <Col sm={4}>
                                    <Row>
                                        <Col>Results</Col>
                                        <Col>Job State</Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Container>
                    </ListGroup.Item>
                    {state.jobs!=null &&
                    state.jobs.map(({ id, finished, jobName, createdAt }) => (
                        <ListGroup.Item key={id}>
                            <Container>
                                <Row>
                                <Col sm={8}>
                                    <Row>
                                        <Col>{jobName}</Col>
                                        <Col>{createdAt}</Col>
                                    </Row>
                                </Col>
                                    <Col sm={4}>
                                        <Row>
                                            <Col>{finished===1 ? <Button onClick={() => {getResults(id)}} id={id}>Results</Button>:<Button onClick={() => {getResults(id)}} id={id} disabled variant='outline-primary'>Results</Button>}</Col>
                                            <Col>{finished===1 ? "Finished":"In progress"}</Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </Container>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </Card>
            <Container className='d-flex justify-content-center align-items-center'>
                <Loading isLoading={isLoading}/>
            </Container>
            <Pagination size="sm">
                <Pagination.Prev
                    onClick={() => {
                    if (state.active > 1) {
                        pagination(state.active - 1);
                    }
                    }}
                />
                {state.pages}
                <Pagination.Next
                    onClick={() => {
                    if (state.active < state.numPages) {
                        pagination(state.active + 1);
                    }
                    }}
                />
                </Pagination>
        </div>
        
    )
}



export default MyJobs;
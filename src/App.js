import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginForm from "./Login";
import Home from "./Home";
import SubmitJobForm from "./SubmitJob";
import MyJobs from "./MyJobs";
import { Container } from "react-bootstrap";
import Navb from "./Navb";
import Default from "./Default";


function App() {
  return(
    <div className="main-content bg-div">
      <Container >
        <Navb />
          <BrowserRouter>
          <Routes>
            <Route path="/" element={<Default/>}/>
            <Route path="login" element={<LoginForm />}/>
            <Route path="home" element={<Home />}/>
            <Route path="submitjob" element={<SubmitJobForm />}/>
            <Route path="myjobs" element={<MyJobs />}/>
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </BrowserRouter>
      </Container>
    </div>
    
  )
  
}

export default App;

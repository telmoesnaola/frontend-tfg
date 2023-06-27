import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import { useEffect } from 'react';

const Default = ()=>{

    const navigate = useNavigate();

    useEffect(()=>{
        if (Cookies.get("authToken")==null){
            navigate("/login");
        }else{
            navigate("/home")
        }
    })
}

export default Default;
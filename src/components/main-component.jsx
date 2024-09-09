import { Button } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { ErrorRegister } from "./error-register";

export function MainComponent(){
    const [userEmail, setUserEmail] = useState("");
    const [users, setUsers] = useState([{UserId:"", UserName:"", password:"", Email:"", Mobile:""}])
    const [userError, setUserError] = useState("");

    useEffect(()=>{
        axios.get("http://localhost:5000/users")
        .then(res=>{
            setUsers(res.data)
        })
    },[])

    function handleUserEmailChange(e){
        setUserEmail(e.target.value);
    }

    function handleGetStartClick(){
        var user = users.find(item => item.Email === userEmail);
        if(user === undefined){
            setUserError(<ErrorRegister />)
        }
    }
    return(
        <div className="d-flex justify-content-center align-items-center" style={{height:"400px"}}>
            <div>
                <h1>Watch Videos Any Where</h1>
                <p className="my-3 text-center">Please register for more technologies video</p>
                <div className="input-group">
                    <input onChange={handleUserEmailChange} type="text" className="form-control" />
                    <Button onClick={handleGetStartClick} variant="contained" color="error">Get Started <span className="bi bi-chevron-right"></span></Button>
                </div>
                <div>
                    <span>{userError}</span>
                </div>
            </div>
        </div>
    )
}
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import { useCookies } from "react-cookie";

export function AdminLogin(){

    const [users, setUsers] = useState([{AdminId:"", AdminName:"", password:""}])
    const [userError, setUserError] = useState("");
    const [cookies, setCookie, removeCookie] = useCookies("adminname")

    let navigate = useNavigate();

    useEffect(()=>{
        axios.get("http://localhost:5000/admin")
        .then(res=>{
            setUsers(res.data)
        })
    },[])

    const formik = useFormik({
        initialValues:{
            AdminId:"",
            AdminName:"",
            Password:""
        },
        onSubmit:(values)=>{
            var user = users.find(item=> item.AdminId === values.AdminId);
            if(user.Password === values.Password){
                setCookie("adminname", user.AdminName)
                navigate("/admindashboard")
            }else{
                setUserError("Invalid Credential")
            }
        }
    })
    return(
        <div>
            <form onSubmit={formik.handleSubmit}>
                <h1><span className="bi bi-person-fill"></span>Admin Login</h1>
                <dl>
                    <dt>Admin Id</dt>
                    <dd><input type="text" name="AdminId" onChange={formik.handleChange}/></dd>
                    <dt>Password</dt>
                    <dd><input type="password" name="Password" onChange={formik.handleChange}/></dd>
                </dl>
                <button type="submit" className="btn btn-primary me-2">Login</button>
                <div className="text-danger h3">{userError}</div>
            </form>
        </div>
    )
}
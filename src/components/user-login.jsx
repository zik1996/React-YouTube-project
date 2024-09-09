import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import { useCookies } from "react-cookie";

export function UserLogin(){

    const [users, setUsers] = useState([{UserId:"", UserName:"", password:"", Email:"", Mobile:""}])
    const [userError, setUserError] = useState("");
    const [cookies, setCookie, removeCookie] = useCookies("username")

    let navigate = useNavigate();

    useEffect(()=>{
        axios.get("http://localhost:5000/users")
        .then(res=>{
            setUsers(res.data)
        })
    },[])

    const formik = useFormik({
        initialValues:{
            UserId:"",
            UserName:"",
            Password:""
        },
        onSubmit:(values)=>{
            var user = users.find(item=> item.UserId === values.UserId);
            if(user.Password === values.Password){
                setCookie("username", user.UserName)
                navigate("/userdashboard")
            }else{
                setUserError("Invalid Credential")
            }
        }
    })
    return(
        <div>
            <form onSubmit={formik.handleSubmit}>
                <h1><span className="bi bi-person-fill"></span>User Login</h1>
                <dl>
                    <dt>User Id</dt>
                    <dd><input type="text" name="UserId" onChange={formik.handleChange}/></dd>
                    <dt>Password</dt>
                    <dd><input type="password" name="Password" onChange={formik.handleChange}/></dd>
                </dl>
                <button type="submit" className="btn btn-primary me-2">Login</button>
                <Link to="/userregister" className="btn btn-success">New User ?</Link>
                <div className="text-danger h3">{userError}</div>
            </form>
        </div>
    )
}
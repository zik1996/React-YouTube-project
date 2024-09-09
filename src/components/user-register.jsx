import axios from "axios";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export function UserRegister(){
    const [users, setUsers] = useState([{UserId:"", UserName:"", password:"", Email:"", Mobile:""}])
    const [userError, setUserError] = useState("");
    const [userErrorColor, setUserErrorColor] = useState("");

    useEffect(()=>{
        axios.get("http://localhost:5000/users")
        .then(res=>{
            setUsers(res.data)
        })
    },[])

    let navigate = useNavigate();
    const formik = useFormik({
        initialValues:{
            UserId:"",
            UserName:"",
            Password:"",
            Email:"",
            Mobile:""
        },
        onSubmit:(user)=>{
            axios.post("http://localhost:5000/adduser", user);
            alert("User Added Successfully")
            navigate("/userlogin")
        }
    })
    function verifyUserId(e){
        for(let user of users){
            if(user.UserId === e.target.value){
                setUserError("User Id Taken - Try Another")
                setUserErrorColor("text-danger")
                break;
            }else{
                setUserError("User Id Available")
                setUserErrorColor("text-success")
            }
        }
    }
    return(
        <div>
            <h1>User Register</h1>
            <form onSubmit={formik.handleSubmit}>
                <dl>
                    <dt>User Id</dt>
                    <dd><input onKeyUp={verifyUserId} type="text" name="UserId" onChange={formik.handleChange}/></dd>
                    <dd className={userErrorColor}>{userError}</dd>
                    <dt>User Name</dt>
                    <dd><input type="text" name="UserName" onChange={formik.handleChange}/></dd>
                    <dt>Password</dt>
                    <dd><input type="password" name="Password" onChange={formik.handleChange}/></dd>
                    <dt>Email</dt>
                    <dd><input type="text" name="Email" onChange={formik.handleChange}/></dd>
                    <dt>Mobile</dt>
                    <dd><input type="text" name="Mobile" onChange={formik.handleChange}/></dd>
                </dl>
                <button type="submit" className="btn btn-primary me-2">Register</button>
                <Link to="/" className="btn btn-light">Cancel</Link>
            </form>
        </div>
    )
}
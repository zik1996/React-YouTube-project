import { Link } from "react-router-dom";

export function ErrorRegister(){
    return(
        <Link to="/userregister" className="btn btn-light mt-2" >Account not found - Register</Link>
    )
}
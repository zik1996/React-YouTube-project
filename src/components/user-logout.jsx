import { useCookies } from "react-cookie"
import { useNavigate } from "react-router-dom"

export function UserLogout(){
    const [cookies, setCookie, removeCookie] = useCookies("username")

    let navigate = useNavigate()
    function handleSignOutClick(){
        removeCookie("username")
        navigate("/userlogin")
    }
    return(
        <button onClick={handleSignOutClick} className="btn btn-light me-2">Sign Out</button>
    )
}
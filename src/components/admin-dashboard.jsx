import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie"
import { Link, useNavigate, useParams } from "react-router-dom";

export function AdminDashboard(){
    const [cookies, setCookie, removeCookie] = useCookies("adminname");
    const [videos, setVideos] = useState([{VideoId:0, Title:"", Url:"", Comments:"", Likes:0, Category_Id:0}])

    let navigate = useNavigate();
    // let params = useParams();
    function LoadVideos(){
        axios.get("http://localhost:5000/videos")
        .then(res=>{
            setVideos(res.data)
        })
    }
    
    useEffect(()=>{
       if(cookies["adminname"]=== undefined){
        navigate("/adminlogin")
       }else{
        LoadVideos();
       }
    },[])

    return(
        <div>
            <h1>{cookies["adminname"]} - Admin Dashboard</h1>
            <Link to="/addvideo" className="btn btn-primary my-2">New Video</Link>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Preview</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                   {
                    videos.map(video=>
                        <tr key={video.VideoId}>
                            <td style={{width:"350px"}}>{video.Title}</td>
                            <td>
                                <iframe src={video.Url} width="300" height="150">

                                </iframe>
                            </td>
                            <td>
                                <Link to={`/editvideo/${video.VideoId}`} className="bi bi-pen-fill btn btn-warning me-2"></Link>
                                <Link to={`/deletevideo/${video.VideoId}`} className="bi bi-trash-fill btn btn-danger"></Link>
                            </td>
                        </tr>
                    )
                   }
                </tbody>
            </table>
        </div>
    )
}
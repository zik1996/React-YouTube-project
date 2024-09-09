import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie"
import { useNavigate } from "react-router-dom";

export function UserDashboard(){
    const [cookies, setCookie, removeCookie] = useCookies("username");
    const [videos, setVideos] = useState([{VideoId:0, Title:"", Url:"", Comments:"", Likes:0, Category_Id:0}])

    let navigate = useNavigate();
    function LoadVideos(){
        axios.get("http://localhost:5000/videos")
        .then(res=>{
            setVideos(res.data)
        })
    }
    
    useEffect(()=>{
       if(cookies["username"]=== undefined){
        navigate("/userlogin")
       }else{
        LoadVideos();
       }
    },[])

    return(
        <div>
            <h1>{cookies["username"]} - User Dashboard</h1>
            <div className="d-flex flex-wrap">
                {
                    videos.map(video=>
                        <div key={video.VideoId} className="card m-2 p-2" style={{width:"350px"}}>
                            <div className="card-header"style={{height:"100px"}}>
                                <h4>{video.Title}</h4>
                            </div>
                            <div className="card-body">
                                <iframe src={video.Url} width="100%">

                                </iframe>
                            </div>
                            <div className="card-footer">
                                <label className="fw-bold">Likes : </label><span className="bi bi-hand-thumbs-up">{video.Likes}</span>
                                <div>
                                    <label className="form-label fw-bold">Comments : </label>
                                    <div>
                                        {video.Comments}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}
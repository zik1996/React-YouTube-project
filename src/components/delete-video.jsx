import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"

export function DeleteVideo(){
    const [videos, setVideos] = useState([{VideoId:0, Title:"", Url:"", Comments:"", Likes:0, Category_Id:0}])

    let params = useParams();
    let navigate = useNavigate();

    function LoadVideos(){
        axios.get(`http://localhost:5000/video/${params.id}`)
        .then(res=>{
            setVideos(res.data)
        })
    }

    useEffect(()=>{
        LoadVideos();
    },[])

    function handleDeleteClick(){
        axios.delete(`http://localhost:5000/deletevideo/${params.id}`)
        alert("Video Deleted");
        navigate("/admindashboard")
        
    }
    return(
        <div>
            <h4 className="mb-4">{videos[0].Title}</h4>
            <div>
               <iframe src={videos[0].Url} width="500px" height="300px">

               </iframe>
            </div>
            <div className="mt-4">
                <button onClick={handleDeleteClick} className="btn btn-danger">Delete</button>
                <Link to="/admindashboard" className="btn btn-warning ms-2">Cancel</Link>
            </div>
        </div>
    )
}
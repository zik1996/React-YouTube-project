import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom";

export function EditVideo(){
    const [videos, setVideos] = useState([{VideoId:0, Title:"", Url:"", Comments:"", Likes:0, Category_Id:0}])
    const [categories, setCategories] = useState([{Category_Id:0, CategoryName:""}]);

    let navigate = useNavigate();
    let params = useParams();
    function LoadCategories(){
        axios.get("http://localhost:5000/categories")
        .then(res=>{
            res.data.unshift({Category_Id: -1, CategoryName:"Select Category"})
            setCategories(res.data)
        })
    }

    function LoadVideos(){
        axios.get(`http://localhost:5000/video/${params.id}`)
        .then(res=>{
            setVideos(res.data)
        })
    }

    useEffect(()=>{
        LoadCategories();
        LoadVideos();
    },[])

    const formik = useFormik({
        initialValues:{
            VideoId:videos[0].VideoId,
            Title:videos[0].Title,
            Url:videos[0].Url,
            Comments:videos[0].Comments,
            Likes:videos[0].Likes,
            Category_Id:videos[0].Category_Id
        },
        enableReinitialize:true,

        onSubmit:(values)=>{
            axios.put(`http://localhost:5000/editvideo/${params.id}`, values);
            alert("Video Updated Successfully");
            navigate("/admindashboard")
        }
    })
    return(
        <div>
             <h1>Edit Video</h1>
            <form onSubmit={formik.handleSubmit}>
                <dl>
                    <dt>Video Id</dt>
                    <dd><input type="number" value={formik.values.VideoId} name="VideoId" onChange={formik.handleChange}/></dd>
                    <dt>Title</dt>
                    <dd><input type="text" value={formik.values.Title} name="Title" onChange={formik.handleChange}/></dd>
                    <dt>Url</dt>
                    <dd><input type="text" value={formik.values.Url} name="Url" onChange={formik.handleChange}/></dd>
                    <dt>Comments</dt>
                    <dd><input type="text" value={formik.values.Comments} name="Comments" onChange={formik.handleChange}/></dd>
                    <dt>Likes</dt>
                    <dd><input type="number" value={formik.values.Likes} name="Likes" onChange={formik.handleChange}/></dd>
                    <dt>Category Id</dt>
                    <dd>
                        <select value={formik.values.Category_Id} name="Category_Id" onChange={formik.handleChange}>
                            {
                                categories.map(category=>
                                    <option value={category.Category_Id} key={category.Category_Id}>
                                        {category.CategoryName.toUpperCase()}
                                    </option>
                                )
                            }
                        </select>
                    </dd>
                    <button className="btn btn-success" type="submit">Save</button>
                    <Link to='/admindashboard' className="btn btn-danger ms-2">Cancel</Link>
                </dl>
            </form>
        </div>
    )
}
import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

export function AddVideo(){
    // const [videos, setVideos] = useState([{VideoId:0, Title:"", Url:"", Comments:"", Likes:0, Category_Id:0}])
    const [categories, setCategories] = useState([{Category_Id:0, CategoryName:""}]);

    let navigate = useNavigate();
    function LoadCategories(){
        axios.get("http://localhost:5000/categories")
        .then(res=>{
            res.data.unshift({Category_Id: -1, CategoryName:"Select Category"})
            setCategories(res.data)
        })
    }

    useEffect(()=>{
        LoadCategories();
    },[])

    const formik = useFormik({
        initialValues:{
            VideoId:0,
            Title:"",
            Url:"",
            Comments:"",
            Likes:0,
            Category_Id:0
        },

        onSubmit:(values)=>{
            axios.post("http://localhost:5000/addvideo", values);
            alert("Video Added Successfully");
            navigate("/admindashboard")
        }
    })
    return(
        <div>
            <h1>Add Video</h1>
            <form onSubmit={formik.handleSubmit}>
                <dl>
                    <dt>Video Id</dt>
                    <dd><input type="number" name="VideoId" onChange={formik.handleChange}/></dd>
                    <dt>Title</dt>
                    <dd><input type="text" name="Title" onChange={formik.handleChange}/></dd>
                    <dt>Url</dt>
                    <dd><input type="text" name="Url" onChange={formik.handleChange}/></dd>
                    <dt>Comments</dt>
                    <dd><input type="text" name="Comments" onChange={formik.handleChange}/></dd>
                    <dt>Likes</dt>
                    <dd><input type="number" name="Likes" onChange={formik.handleChange}/></dd>
                    <dt>Category Id</dt>
                    <dd>
                        <select name="Category_Id" onChange={formik.handleChange}>
                            {
                                categories.map(category=>
                                    <option value={category.Category_Id} key={category.Category_Id}>
                                        {category.CategoryName.toUpperCase()}
                                    </option>
                                )
                            }
                        </select>
                    </dd>
                    <button className="btn btn-primary" type="submit">Add</button>
                </dl>
            </form>
        </div>
    )
}
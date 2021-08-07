import Nav from "./Nav";
import './Details.css'
import { projectFirestore } from "./firebase";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useHistory } from "react-router";
import Loading from "./Loading";
import LoadingTwo from "./LoadingTwo";
import { Link } from "react-router-dom";
const Details = () => {
    const [loading,setLoading] = useState(false)
    const history = useHistory()
    const params = useParams()
    const [blog,setBlog] = useState(null)
    const handleDelete = async(id)=>{
        try {
            await projectFirestore.collection('blogs').doc(id).delete()
        } catch (error) {
            console.log(error.message)
        }
        history.push('/')
    }
    useEffect(()=>{
        setLoading(true)
      let documentRef = projectFirestore.collection('blogs').doc(params.id)
      const unsub = documentRef.onSnapshot(snap=>{
          if(snap.data()){
              setBlog(snap.data())
              setLoading(false)
          } 
      })
       
      return ()=> unsub()
    },[params.id])



    return ( 
        <section className='details'>
            <Nav />
            <div className='details-section'>
                {blog && <h1 className='title-detail'>{blog.title}</h1>}
                {loading && <LoadingTwo/>}
            </div>
            <div className='blog-container'>
            {blog && <div className='blog-details'>
                <p>{blog.preview}</p>
                <span>{blog.id}</span>
                <span className='blog-name'>created by {blog.name.toUpperCase()}</span>    
            <span className="material-icons delete" onClick={()=>{handleDelete(params.id)}}>delete</span>
            <Link to={`/edit/${params.id}`}>
            <span className="material-icons edit">edit</span>
            </Link>  
            </div>}
            </div>
           {loading && <Loading />}
        </section>
     );
}
 
export default Details;
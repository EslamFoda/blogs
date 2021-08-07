import Nav from "./Nav";
import { useHistory } from "react-router";
import { projectFirestore, timestamp } from "./firebase";
import {  useEffect, useState } from "react";
import { useParams } from "react-router";
const Edit = () => {
    const [loading,setLoading] = useState(false)
    const params = useParams()
    const history = useHistory()
    const [name,setName] = useState('')
    const [title,setTitle] = useState('')
    const [preview,setPreview] = useState('')
    const handleUpdate = async(e)=>{
        setLoading(true)
        e.preventDefault();
         let newBlog = {
            name,
            title,
            preview,
            createdAt: timestamp()
        }
        await projectFirestore.collection('blogs').doc(params.id).update(newBlog)
        setLoading(false)
        history.push(`/details/${params.id}`)

    }
    useEffect(()=>{
        let documentRef = projectFirestore.collection('blogs').doc(params.id)
         const unsub = documentRef.onSnapshot(snap=>{
          if(snap.data()){
              setName(snap.data().name)
              setTitle(snap.data().title)
              setPreview(snap.data().preview)
            }
            
          
      })
      return ()=> unsub()
    },[params.id])


    return (
        <div>
            <Nav />
            <div className='details-section'>
            </div>
            <div className='container'>
             <form onSubmit={handleUpdate}>
      <h2>Edit Blog</h2>
      <label>your name:</label>
      <input type="text" required value={name} onChange={((e)=> setName(e.target.value))}/>
      <label>Blog tittle:</label>
      <input type="text" required value={title} onChange={((e)=> setTitle(e.target.value))}/>
      <label>Blog preview:</label>
      <textarea required value={preview} onChange={((e)=> setPreview(e.target.value))}></textarea>
     {loading && <button disabled className='btn-disabled' type='submit'>updating...</button>}
      {!loading && <button type='submit'>update post</button>}
             </form>
            </div>
  
        </div>
     );
}
 
export default Edit;
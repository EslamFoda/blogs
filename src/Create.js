import Nav from "./Nav";
import './Create.css'
import { useHistory } from "react-router";
import { projectFirestore, timestamp } from "./firebase";
import {  useState } from "react";
const Create = () => {
    const history = useHistory()
    const [loading,setLoading] = useState(false)
    const [name,setName] = useState('')
    const [title,setTitle] = useState('')
    const [preview,setPreview] = useState('')
    const handleSubmit = async(e)=>{
        setLoading(true)
        e.preventDefault();
         let newBlog = {
            name,
            title,
            preview,
            createdAt: timestamp()
        }
        await projectFirestore.collection('blogs').add(newBlog)
        setLoading(false)
        history.push('/')
    }
   

    return ( 
        <div>
            <Nav />
            <div className='details-section'>
            </div>
            <div className='container'>
             <form onSubmit={handleSubmit}>
      <h2>Add New Blog</h2>
      <label>your name:</label>
      <input type="text" required value={name} onChange={((e)=> setName(e.target.value))}/>
      <label>Blog tittle:</label>
      <input type="text" required value={title} onChange={((e)=> setTitle(e.target.value))}/>
      <label>Blog preview:</label>
      <textarea required value={preview} onChange={((e)=> setPreview(e.target.value))}></textarea>
      {loading && <button disabled className='btn-disabled' type='submit'>posting...</button>}
      {!loading && <button type='submit'>add post</button>}
             </form>
            </div>
  
        </div>
     );
}
 
export default Create;
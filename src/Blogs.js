import { projectFirestore } from './firebase';
import './Blogs.css'
import Loading from './Loading';
import { useEffect, useState } from 'react';
import SingleBlog from './SingleBlog';
const Blogs = () => {
    const [blogs,setBlogs] = useState(null)
    const [loading,setLoading] = useState(false)
    useEffect(()=>{
        setLoading(true)
        let result = []
      const unsub =  projectFirestore.collection('blogs').orderBy('createdAt','desc').onSnapshot(snap=>{
            snap.docs.forEach(doc=>{
             doc.data().createdAt && result.push({...doc.data(), id: doc.id})
            })
                setBlogs(result)
                setLoading(false)
        })
        return ()=> unsub()
    },[])
    return ( 
        <section className='blog-section'>
            <h1 className='header'>LATEST BLOGS</h1>
            {blogs && <div className='blog-list'>
            {blogs.map(blog=>{
               return <SingleBlog blog={blog} key={blog.id} />
            })}
            </div>}
            {loading && <Loading />}
        </section>
     );
}
 
export default Blogs;
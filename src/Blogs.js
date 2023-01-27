import { projectFirestore } from "./firebase";
import "./Blogs.css";
import Loading from "./Loading";
import { useEffect, useState } from "react";
import SingleBlog from "./SingleBlog";
import { gql, useQuery } from "@apollo/client";
const Blogs = () => {
  // const [posts, setPosts] = useState(null);

  const allPosts = gql`
    query {
      posts {
        __typename
        id
        title
        content
        picture
        createdAt
      }
    }
  `;

  const { data, loading, error } = useQuery(allPosts);
  // console.log(data?.posts, "asdasd");
  // useEffect(()=>{
  //   setPosts(data?.posts)

  // },[data?.posts])
  const posts = data?.posts

  return (
    <section className="blog-section">
      <h1 className="header">LATEST BLOGS</h1>
      {posts && (
        <div className="blog-list">
          {posts?.map((blog) => {
            return <SingleBlog blog={blog} key={blog.id} />;
          })}
        </div>
      )}
      {loading && <Loading />}
    </section>
  );
};

export default Blogs;

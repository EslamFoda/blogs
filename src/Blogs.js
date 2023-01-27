import { projectFirestore } from "./firebase";
import "./Blogs.css";
import Loading from "./Loading";
import { useEffect, useState } from "react";
import SingleBlog from "./SingleBlog";
import { gql, useQuery } from "@apollo/client";
const Blogs = () => {
  const [blogs, setBlogs] = useState(null);
  // const [loading, setLoading] = useState(false);

  const query = gql`
    query {
      posts {
        __typename
        id
        title
        content
        picture
      }
    }
  `;

  // const singe_post = gql`
  //   query ($id: Int!) {
  //     post(id: $id) {
  //       __typename
  //       id
  //       title
  //       content
  //       picture
  //     }
  //   }
  // `;

  // const { data: singlepost } = useQuery(singe_post, {
  //   variables: {
  //     id: 1,
  //   },
  // });

  const { data, loading, error } = useQuery(query);
  console.log(data?.posts, "asdasd");

  return (
    <section className="blog-section">
      <h1 className="header">LATEST BLOGS</h1>
      {data?.posts && (
        <div className="blog-list">
          {data?.posts.map((blog) => {
            return <SingleBlog blog={blog} key={blog.id} />;
          })}
        </div>
      )}
      {loading && <Loading />}
    </section>
  );
};

export default Blogs;

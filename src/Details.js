import Nav from "./Nav";
import "./Details.css";
import { projectFirestore } from "./firebase";
import { useEffect, useState } from "react";
// import { useParams } from "react-router";
import { useHistory } from "react-router";
import Loading from "./Loading";
import LoadingTwo from "./LoadingTwo";
import { Link, useParams } from "react-router-dom";
import { useLazyQuery, useQuery, gql } from "@apollo/client";
const Details = () => {
  const { id } = useParams();

  console.log(id);
  const singe_post = gql`
    query ($id: Int!) {
      post(id: $id) {
        __typename
        id
        title
        content
        picture
      }
    }
  `;

  const [getPost, { data, loading, error }] = useLazyQuery(singe_post);
  console.log(data, "single");

  //   const history = useHistory();

  //   const [blog, setBlog] = useState(null);
  //   const handleDelete = async (id) => {
  //     // try {
  //     //   await projectFirestore.collection("blogs").doc(id).delete();
  //     // } catch (error) {
  //     //   console.log(error.message);
  //     // }
  //     // history.push("/");
  //   };
  //   if (loading) return <p>loading</p>;
  //   if (error) return <p>error</p>;
  useEffect(() => {
    console.log({id})
    if (id)
      getPost({
        variables: {
          id,
        },
      });
    return () => {};
  }, [id]);
  let post;
  if (data) post = data.post;

  return (
    <section className="details">
      <Nav />
      <div className="details-section">
        {/* {blog && <h1 className="title-detail">asddd</h1>} */}
        {/* {load && <LoadingTwo />} */}
      </div>
      <div className="blog-container">
        {/* <h1>{post.title}</h1> */}
        {/* {blog && (
          <div className="blog-details">
            <p>{blog.preview}</p>
            <span>{blog.id}</span>
            <span className="blog-name">
              created by {blog.name.toUpperCase()}
            </span>
            <span
              className="material-icons delete"
              onClick={() => {
                // handleDelete(params.id);
              }}
            >
              delete
            </span>
            <Link to={`/edit/${1}`}>
              <span className="material-icons edit">edit</span>
            </Link>
          </div>
        )} */}
      </div>
      {/* {load && <Loading />} */}
    </section>
  );
};

export default Details;

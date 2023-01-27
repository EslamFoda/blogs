import Nav from "./Nav";
import "./Details.css";
import { Link, useHistory, useParams } from "react-router-dom";
import { useQuery, gql, useMutation } from "@apollo/client";
import LoadingTwo from "./LoadingTwo";
import moment from "moment";
const Details = () => {
  const { id } = useParams();
  const history = useHistory();

  const singe_post = gql`
    query ($id: Int!) {
      post(id: $id) {
        __typename
        id
        title
        content
        picture
        createdAt
      }
    }
  `;

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

  const DELETE_POST = gql`
    mutation ($id: Int!) {
      removePost(id: $id) {
        __typename
        id
        title
        content
        picture
      }
    }
  `;
  const [deletePost] = useMutation(DELETE_POST,{
    refetchQueries:[{query:allPosts}]
  });
  const { data, loading, error } = useQuery(singe_post, {
    variables: { id: Number(id) }
  });
  const blog = data?.post;
  console.log(blog, "single");

  const handleDelete = async () => {
    deletePost({
      variables: {
        id: Number(id),
      },
    });
    history.push("/");
  };

  return (
    <section className="details">
      <Nav />
      <div className="details-section">
        {blog && <h1 className="title-detail">{blog.title}</h1>}
        {loading && <LoadingTwo />}
      </div>
      <div className="blog-container">
        <h1>{blog?.title}</h1>
        {blog && (
          <div className="blog-details">
            <p>{blog?.content}</p>
            <span className="time">
              {moment(blog?.createdAt).format("llll")}
            </span>
            <span className="material-icons delete" onClick={handleDelete}>
              delete
            </span>
            <Link to={`/edit/${id}`}>
              <span className="material-icons edit">edit</span>
            </Link>
          </div>
        )}
      </div>
      {/* {load && <Loading />} */}
    </section>
  );
};

export default Details;

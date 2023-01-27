import Nav from "./Nav";
import "./Details.css";
import { Link, useHistory, useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import LoadingTwo from "./LoadingTwo";
import { ALL_POSTS, DELETE_POST, SINGLE_POST } from "./queries";
import moment from "moment";
const Details = () => {
  const { id } = useParams();
  const history = useHistory();
  const [deletePost] = useMutation(DELETE_POST, {
    refetchQueries: [{ query: ALL_POSTS }],
  });
  const { data, loading, error } = useQuery(SINGLE_POST, {
    variables: { id: Number(id) },
  });
  const blog = data?.post;

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

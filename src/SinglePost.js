import { Link } from "react-router-dom";
import "./Singlepost.css";
const SinglePost = (props) => {
  const post = props.post;
  return (
    <Link to={`/details/${post.id}`}>
      <div className="single-post">
        {/* <span className="name">{post.name}</span> */}
        <h1 className="name">{post.title}</h1>
        <p className="preview">{post.content}</p>
      </div>
    </Link>
  );
};

export default SinglePost;

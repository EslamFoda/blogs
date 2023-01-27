import { Link } from "react-router-dom";
import "./SingleBlog.css";
const SingleBlog = (props) => {
  const blog = props.blog;
  return (
    <Link to={`/details/${blog.id}`}>
      <div className="single-blog">
        {/* <span className="name">{blog.name}</span> */}
        <h1 className="name">{blog.title}</h1>
        <p className="preview">{blog.content}</p>
      </div>
    </Link>
  );
};

export default SingleBlog;

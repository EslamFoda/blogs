import { Link } from "react-router-dom";
import "./Nav.css";

const Nav = () => {
  return (
    <div className="Nav-section">
      <nav>
        <Link to="/">
          <h1 className="logo">Blogs</h1>
        </Link>
        <div className="nav-links">
          <Link className="link" to="/">
            Posts
          </Link>
          <Link className="create-link" to="/create">
            Create
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Nav;

import "./Blogs.css";
import Loading from "./Loading";
import { useQuery } from "@apollo/client";
import { ALL_POSTS } from "./queries";
import SinglePost from "./SinglePost";
import Masonry from "react-masonry-css";

const Blogs = () => {
  const { data, loading, error } = useQuery(ALL_POSTS);
  const breakpointColumnsObj = {
    default: 3,
    900: 2,
    700: 2,
    500: 1,
  };

  const posts = data?.posts;
  console.log(posts);

  return (
    <section className="blog-section">
      <h1 className="header">LATEST POSTS</h1>
      {posts && (
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {posts?.map((post) => {
            return <SinglePost post={post} key={post.id} />;
          })}
        </Masonry>
      )}
      {loading && <Loading />}
    </section>
  );
};

export default Blogs;

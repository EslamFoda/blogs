import { projectFirestore } from "./firebase";
import "./Blogs.css";
import Loading from "./Loading";
import { useQuery } from "@apollo/client";
import { ALL_POSTS } from "./queries";
import SinglePost from "./SinglePost";
const Blogs = () => {
  const { data, loading, error } = useQuery(ALL_POSTS);

  const posts = data?.posts;

  return (
    <section className="blog-section">
      <h1 className="header">LATEST POSTS</h1>
      {posts && (
        <div className="blog-list">
          {posts?.map((post) => {
            return <SinglePost post={post} key={post.id} />;
          })}
        </div>
      )}
      {loading && <Loading />}
    </section>
  );
};

export default Blogs;

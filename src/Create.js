import Nav from "./Nav";
import "./Create.css";
import { useHistory } from "react-router";
import { projectFirestore, timestamp } from "./firebase";
import { useState } from "react";
import { gql, useMutation } from "@apollo/client";
const Create = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [picture, setPicture] = useState("");
  const [preview, setPreview] = useState("");



  const CREATE_POST_MUTATION = gql`
    mutation ($createPostInput: CreatePostInput!) {
      createPost(createPostInput: $createPostInput) {
        __typename
        id
        title
        picture
        content
      }
    }
  `;
  const [createPost, { error }] = useMutation(CREATE_POST_MUTATION);
  const handleSubmit = async (e) => {
   
    e.preventDefault();
    createPost({
        variables: {
          createPostInput: {
            title,
            picture,
            content,
          },
        },
      });

    // let newBlog = {
    //   name,
    //   title,
    //   preview,
    //   createdAt: timestamp(),
    // };
    // await projectFirestore.collection("blogs").add(newBlog);
    // setLoading(false);
    // history.push("/");
  };
  return (
    <div>
      <Nav />
      <div className="details-section"></div>
      <div className="container">
        <form
          onSubmit={handleSubmit}
        >
          <h2>Add New Blog</h2>
          <label>your name:</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label>Blog tittle:</label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label>Blog preview:</label>
          <textarea
            required
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
          <label>picture :</label>
          <input
            type="text"
            required
            value={picture}
            onChange={(e) => setPicture(e.target.value)}
          />
          {loading && (
            <button disabled className="btn-disabled" type="submit">
              posting...
            </button>
          )}
          {!loading && <button type="submit">add post</button>}
        </form>
      </div>
    </div>
  );
};

export default Create;

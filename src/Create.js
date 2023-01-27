import Nav from "./Nav";
import "./Create.css";
import { useHistory } from "react-router";
import { useRef, useState } from "react";
import {  useMutation } from "@apollo/client";
import { CREATE_POST_MUTATION, ALL_POSTS } from "./queries";

const Create = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [picture, setPicture] = useState("");
  const backgroundInput = useRef(null);
  const type = ["image/jpeg", "image/png"];
  const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
    refetchQueries: [{ query: ALL_POSTS }],
  });
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
    history.push("/");
  
  };

  const changeHandler = async (e) => {
    // setError(false);
    const selected = e.target.files[0];
    const reader = new FileReader();
    reader.addEventListener("load", () => {});

    reader.readAsDataURL(e.target.files[0]);

    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    formData.append("upload_preset", "my-upload");
    if (selected && type.includes(selected.type)) {
      const data = await fetch(
        "https://api.cloudinary.com/v1_1/dxrdyke2n/image/upload",
        {
          method: "POST",
          body: formData,
        }
      ).then((r) => r.json());
      console.log(data.secure_url)
    //   setStoredImgs((oldArray) => [...oldArray, data.secure_url]);
    //   itemIndex || itemIndex === 0
    //     ? (comps[compIndex].compData.items[itemIndex].pic = data.secure_url)
    //     : (comps[compIndex].compData.pic = data.secure_url);

    //   setComps([...comps]);
    } else {
    //   setError(true);
    }
  };

  const onButtonClick = () => {
    backgroundInput.current.click();
  };

  return (
    <div>
      <Nav />
      <div className="details-section"></div>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <h2>Add New Post</h2>
          <label>Post tittle:</label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label>Post preview:</label>
          <textarea
            required
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
          <label>picture :</label>
          <div style={{border:"1px solid black"}}>
            <div
              onClick={onButtonClick}
              className="h-full cursor-pointer group w-full rounded-md border border-solid flex items-center flex-col justify-center border-gray-500"
            > 
            add img
             
              <input
                type="file"
                id="file"
                style={{ display: "none" }}
                ref={backgroundInput}
                onChange={changeHandler}
              />
              <span className="text-[#868c96] text-xl group-hover:text-white">
                upload image
              </span>
            </div>
          </div>
          {loading && (
            <button disabled className="btn-disabled" type="submit">
              Posting...
            </button>
          )}
          {!loading && <button type="submit">add post</button>}
        </form>
      </div>
    </div>
  );
};

export default Create;

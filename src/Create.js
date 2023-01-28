import Nav from "./Nav";
import "./Create.css";
import { useHistory } from "react-router";
import { useRef, useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_POST_MUTATION, ALL_POSTS } from "./queries";

const Create = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [loadingImg, setLoadingImg] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [uploadedImg, setUploadedImg] = useState();
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
          picture: uploadedImg,
          content,
        },
      },
    });
    history.push("/");
  };

  const changeHandler = async (e) => {
    setLoadingImg(true);
    const selected = e.target.files[0];
    const reader = new FileReader();
    reader.addEventListener("load", () => {});

    reader.readAsDataURL(e.target.files[0]);

    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    formData.append("upload_preset", "my-upload");
    try {
      if (selected && type.includes(selected.type)) {
        const data = await fetch(
          "https://api.cloudinary.com/v1_1/dxrdyke2n/image/upload",
          {
            method: "POST",
            body: formData,
          }
        ).then((r) => r.json());
        setUploadedImg(data.secure_url);
        setLoadingImg(false);
      }
    } catch (error) {
      console.log(error);
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
          <div
            style={{
              border: uploadedImg ? "1px solid #d9d9d9" : "1px dashed  #d9d9d9",
              background: uploadedImg ? "white" : "rgba(0,0,0,.02)",
            }}
            className="image-container"
          >
            {uploadedImg ? (
              <div className="overlay">
                <div
                  className="uploaded-img"
                  style={{ backgroundImage: `url(${uploadedImg})` }}
                ></div>
                <div className="delete-img-container">
                  <span
                    onClick={() => {
                      setUploadedImg("");
                    }}
                  >
                    d
                  </span>
                </div>
              </div>
            ) : (
              <>
                {loadingImg ? (
                  <div className="loading-upload-container">
                    <span>Uploading...</span>
                    <div class="lds-ring">
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                    </div>
                  </div>
                ) : (
                  <div className="image-btn" onClick={onButtonClick}>
                    <input
                      type="file"
                      id="file"
                      style={{ display: "none" }}
                      ref={backgroundInput}
                      onChange={changeHandler}
                    />
                    <div className="icon-container">
                      <span className="plus-icon">+</span>
                      <span className="upload-text">Upload</span>
                    </div>
                  </div>
                )}
              </>
            )}
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

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { likeBlog, removeBlog } from "../reducers/blogReducer";

const Blog = ({ blog, user }) => {
  const dispatch = useDispatch();
  const [buttonText, setButtonText] = useState("view");
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const handleClick = () => {
    buttonText === "view" ? setButtonText("hide") : setButtonText("view");
  };

  const handleLike = () => {
    const blogObject = {
      ...blog,
      likes: blog.likes + 1,
    };
    dispatch(likeBlog(blogObject));
  };

  const handleDelete = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(removeBlog(blog.id));
    }
  };

  return (
    <>
      <div style={blogStyle} className="blog">
        {blog.title} {blog.author}
        <button
          onClick={handleClick}
          style={{ marginLeft: 10, marginBottom: 5 }}
        >
          {buttonText}
        </button>
        {buttonText === "hide" && (
          <>
            <p>URL : {blog.url}</p>
            <p>
              Likes : {blog.likes}{" "}
              <button onClick={handleLike} className="likeButton">
                Like
              </button>
            </p>
            <p>User: {blog.user.name}</p>
            {user.username === blog.user.username && (
              <button
                onClick={handleDelete}
                style={{
                  marginBottom: 10,
                  backgroundColor: "lightblue",
                  borderRadius: 5,
                  border: "1px solid gray",
                }}
              >
                Remove
              </button>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Blog;

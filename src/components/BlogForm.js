import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setNotification } from "../reducers/notificationReducer";
import { createBlog } from "../reducers/blogReducer";

const BlogForm = ({ blogFormRef }) => {
  const dispatch = useDispatch();
  const [blogTitle, setBlogTitle] = useState("");
  const [blogAuthor, setBlogAuthor] = useState("");
  const [blogUrl, setBlogUrl] = useState("");

  const handleCreateBlog = (e) => {
    e.preventDefault();
    if (blogTitle && blogAuthor && blogUrl) {
      dispatch(
        createBlog({ title: blogTitle, author: blogAuthor, url: blogUrl })
      );
      dispatch(
        setNotification(`a new blog ${blogTitle} by ${blogAuthor} added`, 5)
      );
      setBlogTitle("");
      setBlogAuthor("");
      setBlogUrl("");
      blogFormRef.current.toggleVisibility();
    } else {
      dispatch(setNotification("Please fill all the fields to add a blog", 5));
    }
  };

  return (
    <div style={{ marginBottom: 10 }} className="formDiv">
      <h1>Create new</h1>
      <form onSubmit={handleCreateBlog} className="blogForm">
        <div style={{ display: "flex", alignItems: "center" }}>
          <p style={{ width: 50 }}>Title:</p>
          <input
            style={{ height: 20 }}
            type="text"
            id="title"
            value={blogTitle}
            name="Title"
            onChange={({ target }) => setBlogTitle(target.value)}
          />
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <p style={{ width: 50 }}>Author:</p>
          <input
            style={{ height: 20 }}
            type="text"
            id="author"
            value={blogAuthor}
            name="Author"
            onChange={({ target }) => setBlogAuthor(target.value)}
          />
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <p style={{ width: 50 }}>Url:</p>
          <input
            style={{ height: 20 }}
            type="text"
            id="url"
            value={blogUrl}
            name="Url"
            onChange={({ target }) => setBlogUrl(target.value)}
          />
        </div>

        <button id="create-blog-button">Create</button>
      </form>
    </div>
  );
};

export default BlogForm;

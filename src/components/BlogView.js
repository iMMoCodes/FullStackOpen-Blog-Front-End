import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { likeBlog, removeBlog } from "../reducers/blogReducer";

const BlogView = ({ blog }) => {
  const user = useSelector((state) => state.users);
  const dispatch = useDispatch();

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

  if (!blog) {
    return null;
  }

  return (
    <div>
      <h2>{blog.title}</h2>
      <p>{blog.url}</p>
      <p>
        Likes : {blog.likes}{" "}
        <button onClick={handleLike} className="likeButton">
          Like
        </button>
      </p>
      <p>Added by {blog.user.name}</p>
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
      <h3>Comments</h3>
      <ul>
        {blog.comments.map((comment, idx) => {
          return <li key={idx}>{comment.comment}</li>;
        })}
      </ul>
    </div>
  );
};

export default BlogView;

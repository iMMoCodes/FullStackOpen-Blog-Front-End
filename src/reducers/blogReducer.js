import { createSlice } from "@reduxjs/toolkit";
import { getAll, create, deleteBlog, update } from "../services/blogs";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    appendBlog(state, action) {
      state.push(action.payload);
    },
    setBlogs(state, action) {
      return action.payload;
    },
    voteBlog(state, action) {
      const blogToChange = state.find((n) => n.id === action.payload.id);
      const changedBlog = {
        ...blogToChange,
        likes: (blogToChange.likes += 1),
      };
      state.map((blog) => (blog.id !== action.payload.id ? blog : changedBlog));
    },
    delBlog(state) {
      return state;
    },
  },
});

export const { appendBlog, setBlogs, voteBlog, delBlog } = blogSlice.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await getAll();
    dispatch(setBlogs(blogs));
  };
};

export const createBlog = (content) => {
  return async (dispatch) => {
    const newBlog = await create(content);
    dispatch(appendBlog(newBlog));
  };
};

export const likeBlog = (content) => {
  return async (dispatch) => {
    await update(content, content.id);
    dispatch(voteBlog(content));
  };
};

export const removeBlog = (id) => {
  return async (dispatch) => {
    await deleteBlog(id);
    dispatch(delBlog());
  };
};

export default blogSlice.reducer;

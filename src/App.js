import React, { useState, useEffect, useRef } from "react";
import { Routes, Route, useMatch, Link } from "react-router-dom";
import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";
import { useDispatch, useSelector } from "react-redux";
import { initializeBlogs } from "./reducers/blogReducer";
import { loginUser, logoutUser } from "./reducers/userReducer";
import Users from "./components/Users";
import User from "./components/User";
import { getUsers } from "./services/users";
import BlogView from "./components/BlogView";

const App = () => {
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.notification);
  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.users);
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);
  const blogFormRef = useRef();
  const userMatch = useMatch("/users/:id");
  const singleUser = userMatch
    ? users.find((user) => user.id === userMatch.params.id)
    : null;
  const blogMatch = useMatch("/blogs/:id");
  const singleBlog = blogMatch
    ? blogs.find((blog) => blog.id === blogMatch.params.id)
    : null;

  useEffect(() => {
    if (user !== null) {
      dispatch(initializeBlogs());
    }
  }, [user]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(loginUser(user));
    }
  }, []);

  useEffect(async () => {
    const response = await getUsers();
    setUsers(response);
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = { username, password };
      dispatch(loginUser(user));
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      setUsername("");
      setPassword("");
    } catch (exception) {
      setErrorMsg("Wrong username or password");
      setTimeout(() => {
        setErrorMsg(null);
      }, 5000);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogappUser");
    dispatch(logoutUser());
  };

  if (user === null) {
    return (
      <>
        <div>
          <h2>Log in to application</h2>
          {errorMsg && <h3 style={{ color: "red" }}>{errorMsg}</h3>}
          <form onSubmit={handleLogin}>
            <div>
              username
              <input
                id="username"
                type="text"
                value={username}
                name="Username"
                onChange={({ target }) => setUsername(target.value)}
              />
            </div>
            <div>
              password
              <input
                id="password"
                type="password"
                value={password}
                name="Password"
                onChange={({ target }) => setPassword(target.value)}
              />
            </div>
            <button type="submit" id="login-button">
              login
            </button>
          </form>
        </div>
      </>
    );
  }

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: 300,
        }}
      >
        <Link to="/">Blogs</Link>
        <Link to="/users">Users</Link>
        <h4>{user.name} logged in</h4>
        <button style={{ marginLeft: 5, height: 25 }} onClick={handleLogout}>
          Logout
        </button>
      </div>
      <h1>Blogs</h1>
      {notification && <h2>{notification}</h2>}
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Togglable buttonLabel="Create new blog" ref={blogFormRef}>
                <BlogForm blogFormRef={blogFormRef} />
              </Togglable>
              {blogs.map((blog) => (
                <Blog key={blog.id} blog={blog} user={user} />
              ))}
            </>
          }
        />
        <Route path="/users/:id" element={<User user={singleUser} />} />
        <Route path="/users" element={<Users users={users} />} />
        <Route path="/blogs/:id" element={<BlogView blog={singleBlog} />} />
      </Routes>
    </>
  );
};

export default App;

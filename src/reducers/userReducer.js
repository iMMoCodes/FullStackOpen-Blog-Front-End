import { createSlice } from "@reduxjs/toolkit";
import { setToken } from "../services/blogs";
import { login } from "../services/login";

const userSlice = createSlice({
  name: "users",
  initialState: null,
  reducers: {
    appendUser(state, action) {
      return action.payload;
    },
    logout(state, action) {
      return action.payload;
    },
  },
});

export const { appendUser, logout } = userSlice.actions;

export const loginUser = (credentials) => {
  return async (dispatch) => {
    const loggedUser = await login(credentials);
    dispatch(appendUser(loggedUser));
    setToken(loggedUser.token);
  };
};

export const logoutUser = () => {
  return async (dispatch) => {
    dispatch(logout(null));
  };
};

export default userSlice.reducer;

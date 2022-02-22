import axios from "axios";

const baseUrl = "/api/blogs";
let token = null;

export const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

export const getAll = async () => {
  const config = {
    headers: { Authorization: token },
  };
  const request = await axios.get(baseUrl, config);
  return request.data;
};

export const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

export const update = async (newObject, id) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.put(`${baseUrl}/${id}`, newObject, config);
  return response.data;
};

export const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token },
  };
  await axios.delete(`${baseUrl}/${id}`, config);
};

export const commentBlog = async (id, comment) => {
  try {
    const config = {
      headers: { Authorization: token },
    };
    const response = await axios.post(
      `${baseUrl}/${id}/comments`,
      comment,
      config
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

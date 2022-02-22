import React from "react";
import { Link } from "react-router-dom";

const Users = ({ users }) => {
  return (
    <>
      <h2>Users</h2>
      <table style={{ borderSpacing: 5 }}>
        <tbody>
          <tr>
            <th>Name</th>
            <th>Username</th>
            <th>Blogs created</th>
          </tr>
          {users.map((user) => {
            return (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>
                  <Link to={`/users/${user.id}`}>{user.username}</Link>
                </td>
                <td>{user.blogs.length}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default Users;

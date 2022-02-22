import React, { useEffect, useState } from "react";
import { getUsers } from "../services/users";

const Users = () => {
  const [users, setUsers] = useState([]);
  useEffect(async () => {
    const response = await getUsers();
    setUsers(response);
  }, []);

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
                <td>{user.username}</td>
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

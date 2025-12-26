import { useEffect, useState } from "react";
import { fetchUsers } from "../services/userService";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers().then(res => setUsers(res.data));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Users</h1>

      <div className="card">
        <table className="w-full">
          <thead>
            <tr>
              <th className="table-th">Name</th>
              <th className="table-th">Email</th>
              <th className="table-th">Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u._id}>
                <td className="table-td">{u.name}</td>
                <td className="table-td">{u.email}</td>
                <td className="table-td">{u.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;

import { useEffect, useState } from "react";
import { getAllUsers } from "../../services/userService";
import { deleteUser } from "../../services/userService";

type User = {
  _id: string;
  name: string;
  email: string;
  role: string;
};

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getAllUsers();
        setUsers(data);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };

    



    fetchUsers();
  }, []);
const filteredUsers = users.filter(
  (user) =>
    user.name.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase()) ||
    user.role.toLowerCase().includes(search.toLowerCase())
);

const handleDelete = async (id: string) => {
  try {
    await deleteUser(id);

    setUsers((prev) => prev.filter((user) => user._id !== id));
  } catch (error) {
    console.error(error);
  }
}; 

  return (
  <div>
    <h1 className="text-3xl font-bold text-white mb-6">
      Users Management
    </h1>

    <input
  type="text"
  placeholder="Search users..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  className="w-full p-3 mb-5 rounded bg-zinc-800 text-white"
/>

    <table className="w-full text-white border-collapse">
      <thead>
        <tr className="bg-zinc-800">
          <th className="p-3 text-left">Name</th>
          <th className="p-3 text-left">Email</th>
          <th className="p-3 text-left">Role</th>
          <th className="p-3 text-left">Actions</th>
        </tr>
      </thead>
<tbody>
        {filteredUsers.map((user) => (
          <tr key={user._id} className="border-b border-zinc-700">
            <td className="p-3">{user.name}</td>
            <td className="p-3">{user.email}</td>
            <td className="p-3">{user.role}</td>
            <td className="p-3">
  <button
    onClick={() => handleDelete(user._id)}
    className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded"
  >
    Delete
  </button>
</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

}
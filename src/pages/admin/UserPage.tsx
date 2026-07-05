import { useEffect, useState } from "react";
import { getAllUsers } from "../../services/userService";

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

    
// delete backend remove that user from users state filter it 

    fetchUsers();
  }, []);
const filteredUsers = users.filter((user) => (
  user.name.toLowerCase().includes(search.toLowerCase()) ||
  user.email.toLowerCase().includes(search.toLowerCase()) ||
  user.role.toLowerCase().includes(search.toLowerCase())
));
      

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
        </tr>
      </thead>
<tbody>
        {filteredUsers.map((user) => (
          <tr key={user._id} className="border-b border-zinc-700">
            <td className="p-3">{user.name}</td>
            <td className="p-3">{user.email}</td>
            <td className="p-3">{user.role}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

}
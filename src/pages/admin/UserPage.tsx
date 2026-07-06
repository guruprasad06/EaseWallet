import { useEffect, useState } from "react";
import {
  getAllUsers,
  deleteUser,
  updateUserRole,
  updatedUserStatus,
} from "../../services/userService";
import toast from "react-hot-toast";

type User = {
  _id: string;
  name: string;
  email: string;
  role: string;
  isSuspended: boolean;
};

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getAllUsers();
        setUsers(data);
      } catch (error) {
        console.error("Failed to fetch users:", error);
        
      }finally {
  setLoading(false);
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

const handleDelete = (user: User) => {
  toast(
    (t) => (
      <div>
        <p className="mb-3">
          Delete <strong>{user.name}</strong>?
        </p>

        <div className="flex gap-2">
          <button
            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
            onClick={async () => {
              try {
                await deleteUser(user._id);

                setUsers((prev) =>
                  prev.filter((u) => u._id !== user._id)
                );

                toast.dismiss(t.id);
                toast.success(`${user.name} deleted successfully`);
              } catch (error) {
                toast.dismiss(t.id);
                toast.error(`Failed to delete ${user.name}`);
              }
            }}
          >
            Yes
          </button>

          <button
            className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded"
            onClick={() => toast.dismiss(t.id)}
          >
            No
          </button>
        </div>
      </div>
    ),
    {
      duration: 5000,
    }
  );
  
};

const handleRoleChange = (user: User, newRole: string) => {
  toast(
    (t) => (
      <div>
        <p className="mb-3">
          Change <strong>{user.name}</strong>'s role to{" "}
          <strong>{newRole}</strong>?
        </p>

        <div className="flex gap-2">
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
            onClick={async () => {
              try {
                await updateUserRole(user._id, newRole);

                setUsers((prev) =>
                  prev.map((u) =>
                    u._id === user._id
                      ? { ...u, role: newRole }
                      : u
                  )
                );

                toast.dismiss(t.id);
                toast.success(`${user.name} is now ${newRole}`);
              } catch (error) {
                toast.dismiss(t.id);
                toast.error("Failed to update role");
              }
            }}
          >
            Yes
          </button>

          <button
            className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded"
            onClick={() => toast.dismiss(t.id)}
          >
            No
          </button>
        </div>
      </div>
    ),
    {
      duration: 5000,
    }
  );
};
const handleStatus = (user: User) => {
  const newStatus = !user.isSuspended;
  const actionText = newStatus ? "suspend" : "activate";

  toast(
    (t) => (
      <div>
        <p className="mb-3">
          Are you sure you want to {actionText}{" "}
          <strong>{user.name}</strong>?
        </p>

        <div className="flex gap-2">
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
            onClick={async () => {
              try {
                await updatedUserStatus(user._id, newStatus);

                setUsers((prev) =>
                  prev.map((u) =>
                    u._id === user._id
                      ? { ...u, isSuspended: newStatus }
                      : u
                  )
                );

                toast.dismiss(t.id);
                toast.success(
                  `${user.name} ${
                    newStatus ? "suspended" : "activated"
                  } successfully`
                );
              } catch (error) {
                toast.dismiss(t.id);
                toast.error("Failed to update user status");
              }
            }}
          >
            Yes
          </button>

          <button
            className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded"
            onClick={() => toast.dismiss(t.id)}
          >
            No
          </button>
        </div>
      </div>
    ),
    {
      duration: 5000,
    }
  );
};
if (loading) {
  return <div className="text-white text-xl">Loading users...</div>;
}

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

              <td className="p-3">
                <select
                  value={user.role}
                  onChange={(e) =>
                    handleRoleChange(user, e.target.value)
                  }
                  className="bg-zinc-800 border border-zinc-600 rounded px-2 py-1"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </td>

              <td className="p-3">
                <div className="flex gap-4">
                <button
                  onClick={() => handleDelete(user)}
                  className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded"
                >
                  Delete
                </button>
                <button
  onClick={() => handleStatus(user)}
  className={`px-3 py-1 rounded text-white ${
    user.isSuspended
      ? "bg-green-600 hover:bg-green-700"
      : "bg-yellow-600 hover:bg-yellow-700"
  }`}
>
  {user.isSuspended ? "Activate" : "Suspend"}
</button></div>
              </td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
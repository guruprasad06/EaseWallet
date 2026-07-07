import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminDashboardPage() {
  const [users, setUsers] = useState([]);
  const [files, setFiles] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem("token");

      const userRes = await axios.get(
        "http://localhost:5000/api/users/all",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const fileRes = await axios.get(
        "http://localhost:5000/api/vault",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUsers(userRes.data);
      setFiles(fileRes.data);
    } catch (error) {
      console.log(error);
    }
  };

  const totalUsers = users.length;

  const totalAdmins = users.filter(
    (user: any) => user.role === "admin"
  ).length;

const suspendedUsers = users.filter(
  (user: any) => user.isSuspended
).length;

  const totalFiles = files.length;

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-8">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        <div className="bg-zinc-800 rounded-xl p-6">
          <h2 className="text-zinc-400 text-sm">
            Total Users
          </h2>
          <p className="text-3xl font-bold text-white mt-2">
            {totalUsers}
          </p>
        </div>

        <div className="bg-zinc-800 rounded-xl p-6">
          <h2 className="text-zinc-400 text-sm">
            Admins
          </h2>
          <p className="text-3xl font-bold text-white mt-2">
            {totalAdmins}
          </p>
        </div>

        <div className="bg-zinc-800 rounded-xl p-6">
          <h2 className="text-zinc-400 text-sm">
            Suspended Users
          </h2>
          <p className="text-3xl font-bold text-white mt-2">
            {suspendedUsers}
          </p>
        </div>

        <div className="bg-zinc-800 rounded-xl p-6">
          <h2 className="text-zinc-400 text-sm">
            Total Files
          </h2>
          <p className="text-3xl font-bold text-white mt-2">
            {totalFiles}
          </p>
        </div>

      </div>
    </div>
  );
}
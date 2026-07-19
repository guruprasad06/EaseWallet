import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  ChartColumn,
  HardDrive,
} from "lucide-react";

export default function AdminDashboardPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [files, setFiles] = useState<any[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
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
  };

  const admins = users.filter(u => u.role === "admin").length;
  const suspended = users.filter(u => u.isSuspended).length;

  return (
    <div>

      <h1 className="text-4xl font-bold text-white mb-8">
        👑 Admin Dashboard
      </h1>

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

        <div className="bg-zinc-900 p-6 rounded-xl">
          <p className="text-zinc-400">Users</p>
          <h2 className="text-4xl font-bold text-white">
            {users.length}
          </h2>
        </div>

        <div className="bg-zinc-900 p-6 rounded-xl">
          <p className="text-zinc-400">Admins</p>
          <h2 className="text-4xl font-bold text-green-400">
            {admins}
          </h2>
        </div>

        <div className="bg-zinc-900 p-6 rounded-xl">
          <p className="text-zinc-400">Suspended</p>
          <h2 className="text-4xl font-bold text-red-400">
            {suspended}
          </h2>
        </div>

        <div className="bg-zinc-900 p-6 rounded-xl">
          <p className="text-zinc-400">Files</p>
          <h2 className="text-4xl font-bold text-indigo-400">
            {files.length}
          </h2>
        </div>

      </div>

      <div className="mt-10 bg-zinc-900 rounded-xl p-6">

        <h2 className="text-2xl font-bold text-white mb-4">
          Quick Actions
        </h2>

        <div className="flex gap-4">

          <Link
            to="/admin/users"
            className="bg-indigo-600 px-5 py-3 rounded-lg"
          >
            Manage Users
          </Link>

          <Link
            to="/admin/analytics"
            className="bg-green-600 px-5 py-3 rounded-lg"
          >
            View Analytics
          </Link>

          <Link
            to="/admin/settings"
            className="bg-yellow-600 px-5 py-3 rounded-lg"
          >
            Settings
          </Link>

        </div>

      </div>

    </div>
  );
}
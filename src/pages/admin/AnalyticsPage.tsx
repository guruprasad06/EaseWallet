import { useEffect, useState } from "react";
import axios from "axios";

export default function AnalyticsPage() {

  const [users, setUsers] = useState<any[]>([]);
  const [files, setFiles] = useState<any[]>([]);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {

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

  const admins = users.filter(
    u => u.role === "admin"
  ).length;

  const normalUsers = users.filter(
    u => u.role === "user"
  ).length;

  const suspended = users.filter(
    u => u.isSuspended
  ).length;

  const active = users.length - suspended;

  return (

    <div>

      <h1 className="text-4xl font-bold text-white mb-8">
        📈 Analytics
      </h1>

      <div className="grid md:grid-cols-2 gap-6">

        <div className="bg-zinc-900 rounded-xl p-6">

          <h2 className="text-xl font-bold mb-6">
            User Statistics
          </h2>

          <div className="space-y-4">

            <div className="flex justify-between">
              <span>Total Users</span>
              <span>{users.length}</span>
            </div>

            <div className="flex justify-between">
              <span>Admins</span>
              <span>{admins}</span>
            </div>

            <div className="flex justify-between">
              <span>Users</span>
              <span>{normalUsers}</span>
            </div>

            <div className="flex justify-between">
              <span>Active</span>
              <span>{active}</span>
            </div>

            <div className="flex justify-between">
              <span>Suspended</span>
              <span>{suspended}</span>
            </div>

          </div>

        </div>

        <div className="bg-zinc-900 rounded-xl p-6">

          <h2 className="text-xl font-bold mb-6">
            Storage Statistics
          </h2>

          <div className="space-y-4">

            <div className="flex justify-between">
              <span>Total Files</span>
              <span>{files.length}</span>
            </div>

            <div className="flex justify-between">
              <span>Average Files/User</span>
              <span>
                {users.length === 0
                  ? 0
                  : (files.length / users.length).toFixed(1)}
              </span>
            </div>

          </div>

        </div>

      </div>

      <div className="bg-zinc-900 rounded-xl mt-8 p-6">

        <h2 className="text-2xl font-bold mb-6">
          System Health
        </h2>

        <div className="grid md:grid-cols-4 gap-6">

          <div>
            <p className="text-zinc-400">Users</p>
            <h2 className="text-3xl">{users.length}</h2>
          </div>

          <div>
            <p className="text-zinc-400">Admins</p>
            <h2 className="text-3xl text-green-400">{admins}</h2>
          </div>

          <div>
            <p className="text-zinc-400">Files</p>
            <h2 className="text-3xl text-indigo-400">{files.length}</h2>
          </div>

          <div>
            <p className="text-zinc-400">Suspended</p>
            <h2 className="text-3xl text-red-400">{suspended}</h2>
          </div>

        </div>

      </div>

    </div>

  );
}
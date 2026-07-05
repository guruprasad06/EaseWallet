import { NavLink, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default function AdminSidebar() {
  const auth = useAuth();
  const navigate = useNavigate();

  return (
    <div className="w-64 min-h-screen bg-zinc-900 text-white p-6">
      <h1 className="text-2xl font-bold mb-8">
        👑 Admin Panel
      </h1>

      <nav className="flex flex-col gap-4">
        <NavLink
          to="/admin/dashboard"
          className={({ isActive }) =>
            isActive
              ? "bg-indigo-600 p-3 rounded"
              : "bg-zinc-800 p-3 rounded hover:bg-zinc-700"
          }
        >
          📊 Dashboard
        </NavLink>

        <NavLink
          to="/admin/users"
          className={({ isActive }) =>
            isActive
              ? "bg-indigo-600 p-3 rounded"
              : "bg-zinc-800 p-3 rounded hover:bg-zinc-700"
          }
        >
          👥 Users
        </NavLink>

        <NavLink
          to="/admin/analytics"
          className={({ isActive }) =>
            isActive
              ? "bg-indigo-600 p-3 rounded"
              : "bg-zinc-800 p-3 rounded hover:bg-zinc-700"
          }
        >
          📈 Analytics
        </NavLink>

        <NavLink
          to="/admin/settings"
          className={({ isActive }) =>
            isActive
              ? "bg-indigo-600 p-3 rounded"
              : "bg-zinc-800 p-3 rounded hover:bg-zinc-700"
          }
        >
          ⚙️ Settings
        </NavLink>
      </nav>

      <button
        className="mt-8 w-full bg-red-600 hover:bg-red-700 text-white p-3 rounded-lg"
        onClick={() => {
          localStorage.removeItem("token");
          auth?.setUser(null);
          navigate("/login");
        }}
      >
        Logout
      </button>
    </div>
  );
}
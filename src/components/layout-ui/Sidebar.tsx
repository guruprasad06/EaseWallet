import { NavLink, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";


export default function Sidebar() {
  const auth = useAuth();
  const navigate = useNavigate();
  const dashboardLink=auth?.user?.role==="admin"?"admin/dashboard":"app/dashboard";

  return (
    <div className="w-64 min-h-screen bg-zinc-900 text-white p-6">
      <h1 className="text-2xl font-bold mb-8">
        EaseWallet
      </h1>

      <nav className="flex flex-col gap-4">
        <NavLink
          to={`/${dashboardLink}`}
          className={({ isActive }) =>
            isActive
              ? "bg-indigo-600 p-3 rounded"
              : "bg-zinc-800 p-3 rounded hover:bg-zinc-700"
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/app/vault"
          className={({ isActive }) =>
            isActive
              ? "bg-indigo-600 p-3 rounded"
              : "bg-zinc-800 p-3 rounded hover:bg-zinc-700"
          }
        >
          My Vault
        </NavLink>

        <NavLink
          to="/app/profile"
          className={({ isActive }) =>
            isActive
              ? "bg-indigo-600 p-3 rounded"
              : "bg-zinc-800 p-3 rounded hover:bg-zinc-700"
          }
        >
          Profile
        </NavLink>
      </nav>

      <button
        className="mt-8 bg-red-600 hover:bg-red-700 text-white p-2 rounded w-full"
        onClick={() => {
          auth?.setUser(null);
          navigate("/login");
        }}
      >
        Logout
      </button>
    </div>
  );
}
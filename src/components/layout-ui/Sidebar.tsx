import { NavLink, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import {
  LayoutDashboard,
  FolderOpen,
  Trash2,
  UserRound,
  LogOut,
} from "lucide-react";

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
       <NavLink to={`/${dashboardLink}`} className={({ isActive }) =>
  isActive
    ? "bg-indigo-600 p-3 rounded flex items-center gap-2"
    : "bg-zinc-800 p-3 rounded hover:bg-zinc-700 flex items-center gap-2"
}>
  <LayoutDashboard size={18} />
  Dashboard
</NavLink>

        <NavLink to="/app/vault" className={({ isActive }) =>
  isActive
    ? "bg-indigo-600 p-3 rounded flex items-center gap-2"
    : "bg-zinc-800 p-3 rounded hover:bg-zinc-700 flex items-center gap-2"
}>
  <FolderOpen size={18} />
  My Vault
</NavLink>

        <NavLink to="/app/profile" className={({ isActive }) =>
  isActive
    ? "bg-indigo-600 p-3 rounded flex items-center gap-2"
    : "bg-zinc-800 p-3 rounded hover:bg-zinc-700 flex items-center gap-2"
}>
  <UserRound size={18} />
  Profile
</NavLink>
<NavLink to="/app/recycle-bin" className={({ isActive }) =>
  isActive
    ? "bg-indigo-600 p-3 rounded flex items-center gap-2"
    : "bg-zinc-800 p-3 rounded hover:bg-zinc-700 flex items-center gap-2"
}>
  <Trash2 size={18} />
  Recycle Bin
</NavLink>
      </nav>

     <button
  className="mt-8 bg-red-600 hover:bg-red-700 text-white p-3 rounded w-full flex items-center justify-center gap-2"
  onClick={() => {
    auth?.setUser(null);
    navigate("/login");
  }}
>
  <LogOut size={18} />
  Logout
</button>
    </div>
  );
}
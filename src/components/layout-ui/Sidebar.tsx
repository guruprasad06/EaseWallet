import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="w-64 min-h-screen bg-zinc-900 text-white p-6">
      <h1 className="text-2xl font-bold mb-8">
        EaseWallet
      </h1>

      <nav className="flex flex-col gap-4">
        <Link to="/app/dashboard">Dashboard</Link>
        <Link to="/app/vault">My Vault</Link>
        <Link to="/app/profile">Profile</Link>
      </nav>
    </div>
  );
}
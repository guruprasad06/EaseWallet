import { useEffect, useState } from "react";
import { vaultService } from "../../services/vaultService";
import useAuth from "../../hooks/useAuth";
import { Link } from "lucide-react";
import { LayoutDashboard } from "lucide-react";

export default function DashboardPage() {
  const [items, setItems] = useState<any[]>([]);
  const auth = useAuth();

  useEffect(() => {
    vaultService.getItems().then(setItems);
  }, []);

  const notes = items.filter((i) => i.type === "note").length;
  const images = items.filter((i) => i.type === "image").length;
  const documents = items.filter((i) => i.type === "document").length;

  return (
    <>
      <h1 className="text-3xl font-bold mb-6">
        Dashboard
      </h1>

      <div className="bg-zinc-900 p-6 rounded-xl mb-6">
        <h2 className="text-2xl font-bold">
          Welcome Back, {auth?.user?.name} 👋
        </h2>

        <p className="text-zinc-400 mt-2">
          Manage your notes, documents and images securely.
        </p>
      </div>

      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
        <div className="bg-zinc-900 p-6 rounded-xl">
          <h2>Total Notes</h2>
          <p className="text-3xl font-bold">{notes}</p>
        </div>

        <div className="bg-zinc-900 p-6 rounded-xl">
          <h2>Total Images</h2>
          <p className="text-3xl font-bold">{images}</p>
        </div>

        <div className="bg-zinc-900 p-6 rounded-xl">
          <h2>Total Documents</h2>
          <p className="text-3xl font-bold">{documents}</p>
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
    </>
  );
}
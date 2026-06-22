import { useEffect, useState } from "react";
import { vaultService } from "../../services/vaultService";
import useAuth from "../../hooks/useAuth";

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
      </div>
    </>
  );
}